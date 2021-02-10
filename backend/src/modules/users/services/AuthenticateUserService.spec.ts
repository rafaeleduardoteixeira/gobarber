import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import CreateUserService from '@modules/users/services/CreateUserService'

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AutheticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
  })

  it('Should be able to authenticate', async () => {

    await createUser.execute({ name: 'Rafael Teixeira', email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' });
    const response = await authenticateUser.execute({ email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' })
    expect(response).toHaveProperty('token');

  })

  it('Should not be able to athenticate non existin user', async () => {

    expect(authenticateUser.execute({ email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' })).rejects.toBeInstanceOf(AppError)

  })

  it('Should be able to athenticate with wrong password', async () => {

    await createUser.execute({ name: 'Rafael Teixeira', email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' });
    await expect(authenticateUser.execute({ email: 'rafaeleduardoteixeira@gmail.com', password: '123' })).rejects.toBeInstanceOf(AppError)

  })
})