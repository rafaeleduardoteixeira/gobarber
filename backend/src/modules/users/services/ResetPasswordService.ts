import { injectable, inject } from 'tsyringe'
import { differenceInHours } from 'date-fns'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'


interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordEmailService {
  constructor(
    @inject('UserRepository') private usersRepository: IUsersRepository,
    @inject('UserTokensRepository') private userTokensRepository: IUserTokensRepository,
    @inject('HashProvider') private hashProvider: IHashProvider) { }

  public async execute({ token, password }: IRequest): Promise<void> {

    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }
    const user = await this.usersRepository.findById(userToken?.user_id)

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreated = userToken.created_at;

    if (differenceInHours(new Date(Date.now()), tokenCreated) > 2) {
      throw new AppError('Token expired')
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);

  }
}

export default ResetPasswordEmailService;
