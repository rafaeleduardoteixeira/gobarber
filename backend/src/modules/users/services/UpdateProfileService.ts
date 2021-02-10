import { injectable, inject } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'

interface IRequest {
  user_id: number;
  name: string;
  email: string;
  oldPassword?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(@inject('UserRepository') private usersRepository: IUsersRepository, @inject('HashProvider') private hashProvider: IHashProvider) {
  }

  public async execute({ user_id, name, email, oldPassword, password }: IRequest): Promise<User | undefined> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found')
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);
    if (userWithUpdatedEmail && userWithUpdatedEmail.id != user_id) {
      throw new AppError('Email already in use')
    }

    user.name = name;
    user.email = email;

    if (password && !oldPassword) {
      throw new AppError('Need inform old password to update password')
    }

    if (password && oldPassword) {
      const checkOldPassword = await this.hashProvider.compareHash(oldPassword, user.password)
      if (!checkOldPassword) {
        throw new AppError('Incorrect old password')
      }
    }

    if (password) {
      user.password = await this.hashProvider.generateHash(password)
    }
    return await this.usersRepository.save(user);

  }
}

export default UpdateProfileService;
