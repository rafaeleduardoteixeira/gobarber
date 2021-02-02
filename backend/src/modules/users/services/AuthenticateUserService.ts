import { getRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError'

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError("Incorrect email/password.", 401);
    }

    const passwordMatched = await compare(password, user.password);
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