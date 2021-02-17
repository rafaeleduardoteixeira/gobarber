import { getRepository, Repository } from "typeorm";
import { v4 } from "uuid";
import UserToken from "@modules/users/infra/typeorm/entities/UserToken";
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;
  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { token }
    })

    return findUser;
  }

  public async generate(user_id: number): Promise<UserToken> {
    const userToken = await this.ormRepository.create({
      user_id
    });

    userToken.token = v4();

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
