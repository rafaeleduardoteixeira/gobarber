import path from "path";
import fs from "fs";
import { injectable, inject } from 'tsyringe'
import uploadConfig from "@config/upload";
import AppError from '@shared/errors/AppError'
import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

interface IRequest {
  id: number;
  filename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(@inject('UserRepository') private usersRepository: IUsersRepository) {
  }

  public async execute({ id, filename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("User not authenticated.", 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      if (fs.existsSync(userAvatarFilePath)) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = filename;
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
