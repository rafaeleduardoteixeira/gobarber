import { injectable, inject } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStarageProvider'

interface IRequest {
  id: number;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(@inject('UserRepository') private usersRepository: IUsersRepository, @inject('DiskStorageProvider') private diskStorageProvider: IStorageProvider) {
  }

  public async execute({ id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("User not authenticated.", 401);
    }

    if (user.avatar) {
      this.diskStorageProvider.deleteFile(user.avatar)
    }

    const fileName = await this.diskStorageProvider.saveFile(avatarFileName)

    user.avatar = fileName;
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
