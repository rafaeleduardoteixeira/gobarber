import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import CreateUserservice from '@modules/users/services/CreateUserService'

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserservice: CreateUserservice;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserservice = new CreateUserservice(fakeUsersRepository, fakeHashProvider);
  })

  it('Should be able to create a new user', async () => {

    const user = await createUserservice.execute({ name: 'Rafael Teixeira', email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' })
    expect(user).toHaveProperty('id');

  })

  it('Should be able to create a new user with duplicate email', async () => {

    await createUserservice.execute({ name: 'Rafael Teixeira', email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' })
    await expect(createUserservice.execute({ name: 'Rafael Teixeira', email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' })).rejects.toBeInstanceOf(AppError);

  })
})