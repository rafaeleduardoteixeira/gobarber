import UserToken from "@modules/users/infra/typeorm/entities/UserToken";
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import { uuid } from "uuidv4";

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

    userToken.token = uuid()
    userToken.user_id = user_id

    this.users.push(userToken);

    return userToken;
  }

}

export default FakeUserTokensRepository;