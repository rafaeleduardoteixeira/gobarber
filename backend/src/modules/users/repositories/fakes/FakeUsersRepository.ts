import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import IFindAllProvidersDTO from "@modules/users/dtos/IFindAllProvidersDTO"

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: number): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id == id)
    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email == email)
    return findUser;
  }

  public async findAllProviders({ except_user_id }: IFindAllProvidersDTO): Promise<User[]> {
    let users = this.users;
    if (except_user_id) {
      users = this.users.filter(user => user.id != except_user_id);
    }
    return users;
  }

  public async create({ name, email, password }: ICreateUserDTO): Promise<User> {

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;

    if (this.users) {
      if (this.users.length > 0) {
        user.id = this.users[this.users.length - 1].id + 1;
      } else {
        user.id = 1
      }
    }

    this.users.push(user);
    return user

  }

  public async save(user: User): Promise<User> {

    const findIndex = this.users.findIndex(findUser => findUser.id == user.id)
    this.users[findIndex] = user;
    return user;

  }

}

export default FakeUsersRepository;
