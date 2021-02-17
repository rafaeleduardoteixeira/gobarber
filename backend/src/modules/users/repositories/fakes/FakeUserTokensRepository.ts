import UserToken from "@modules/users/infra/typeorm/entities/UserToken";
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import { v4 } from "uuid";

class FakeUserTokensRepository implements IUserTokensRepository {
  private users: UserToken[] = [];

  public async generate(user_id: number): Promise<UserToken> {
    const userToken = new UserToken();

    if (this.users) {
      if (this.users.length > 0) {
        userToken.id = this.users[this.users.length - 1].id + 1;
      } else {
        userToken.id = 1
      }
    }

    userToken.token = v4()
    userToken.user_id = user_id
    userToken.created_at = new Date()

    this.users.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {

    const userToken = this.users.find(findToken => findToken.token == token)
    return userToken;

  }

}

export default FakeUserTokensRepository;
