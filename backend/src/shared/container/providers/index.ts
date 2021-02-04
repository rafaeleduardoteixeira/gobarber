import { container } from 'tsyringe'
import DiskStarageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStarageProvider'


container.registerSingleton<IStorageProvider>('DiskStarageProvider', DiskStarageProvider)