import User from "../infra/typeorm/entities/User";
import { injectable, inject } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'


interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository') private usersRepository: IUsersRepository,
    @inject('UserTokensRepository') private userTokensRepository: IUserTokensRepository,
    @inject('MailProvider') private mailProvider: IMailProvider) {
  }

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exist')
    }

    this.userTokensRepository.generate(user.id)

    this.mailProvider.sendMail(email, "Recuperação de senha recebido.")

  }
}

export default SendForgotPasswordEmailService;
