import path from "path";
import fs from "fs";
import { injectable, inject } from 'tsyringe'
import uploadConfig from "@config/upload";
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
  constructor(@inject('UserRepository') private usersRepository: IUsersRepository, @inject('DiskStarageProvider') private diskStarageProvider: IStorageProvider) {
  }

  public async execute({ id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("User not authenticated.", 401);
    }

    if (user.avatar) {
      this.diskStarageProvider.deleteFile(user.avatar)
    }

    const fileName = await this.diskStarageProvider.saveFile(avatarFileName)

    user.avatar = fileName;
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
