import User from "../infra/typeorm/entities/User";
import { sign } from "jsonwebtoken";
import { injectable, inject } from 'tsyringe'
import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(@inject('UserRepository') private usersRepository: IUsersRepository, private hashProvider: IHashProvider) {
  }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email/password.", 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(password, user.password);
    if (!passwordMatched) {
      throw new AppError("Incorrect email/password.", 401);
    }

    const token = sign({
    }, authConfig.jwt.secret
      , {
        subject: user.id.toString(),
        expiresIn: authConfig.jwt.expiresIn
      });

    return { user, token };
  }
}

export default AuthenticateUserService;
