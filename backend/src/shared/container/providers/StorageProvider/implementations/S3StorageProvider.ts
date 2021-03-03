import fs from 'fs'
import path from 'path'
import mime from 'mime-types'
import aws, { S3 } from 'aws-sdk'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStarageProvider'

export default class DiskStorageProvider implements IStorageProvider {
  private client: S3;
  constructor() {
    this.client = new aws.S3({
      region: 'sa-east-1'
    })
  }

  public async saveFile(file: string): Promise<string> {
    const tmpDirectory = path.resolve(__dirname, "..", "..", "..", "..", "..", "..", "tmp", file);
    const ContentType = mime.lookup(tmpDirectory)

    if (!ContentType) {
      throw new Error('File not found')
    }

    const fileContent = await fs.promises.readFile(tmpDirectory);

    await this.client.putObject({
      Bucket: 'gobarber-2021',
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
    }).promise();

    await fs.promises.unlink(tmpDirectory);

    return file;

  }

  public async deleteFile(file: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: 'gobarber-2021',
      Key: file,
    }).promise();
  }
}