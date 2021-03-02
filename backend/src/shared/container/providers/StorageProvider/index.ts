import { container } from 'tsyringe'
import uploadConfig from '@config/upload'
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider'
import S3StorageProvider from '@shared/container/providers/StorageProvider/implementations/S3StorageProvider'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStarageProvider'


const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>('DiskStorageProvider', providers[uploadConfig.driver])