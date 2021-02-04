import { getRepository, Repository } from "typeorm";
import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;
  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: number): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne(id);
    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { email: email },
    });
    return findUser;
  }

  public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password })
    await this.ormRepository.save(user)

    return user
  }

  public async save(user: User): Promise<User> {
    return await this.ormRepository.save(user)
  }

}

export default UsersRepository;