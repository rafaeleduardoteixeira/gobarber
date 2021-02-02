import { getRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import path from "path";
import uploadConfig from "../../../config/upload";
import fs from "fs";
import AppError from '../../../shared/errors/AppError'

interface Request {
  user_id: string;
  filename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, filename }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne(user_id);

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
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
