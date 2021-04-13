import fs from 'fs'
import path from 'path'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStarageProvider'

export default class DiskStorageProvider implements IStorageProvider {

    public async saveFile(file: string): Promise<string> {
        const tmpDirectory = path.resolve(__dirname, "..", "..", "..", "..", "..", "..", "tmp");
        const uploadDirectory = path.resolve(__dirname, "..", "..", "..", "..", "..", "..", "tmp", "uploads");

        await fs.promises.rename(
            path.resolve(tmpDirectory, file),
            path.resolve(uploadDirectory, file),
        )

        return file;

    }

    public async deleteFile(file: string): Promise<void> {
        const uploadDirectory = path.resolve(__dirname, "..", "..", "tmp", "uploads");
        const filePath = path.resolve(uploadDirectory, file);
        try {
            await fs.promises.stat(filePath);
        } catch {
            return;
        }
        await fs.promises.unlink(filePath);

    }
}