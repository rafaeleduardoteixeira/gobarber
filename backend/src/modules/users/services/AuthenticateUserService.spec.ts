import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import CreateUserService from '@modules/users/services/CreateUserService'

describe('AutheticateUser', () => {
  it('Should be able to authenticate', async () => {

    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    await createUser.execute({ name: 'Rafael Teixeira', email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' });
    const response = await authenticateUser.execute({ email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' })

    expect(response).toHaveProperty('token');
  })

  it('Should not be able to athenticate non existin user', async () => {

    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    expect(authenticateUser.execute({ email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' })).rejects.toBeInstanceOf(AppError)
  })

  it('Should be able to athenticate with wrong password', async () => {

    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
    await createUser.execute({ name: 'Rafael Teixeira', email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' });

    expect(authenticateUser.execute({ email: 'rafaeleduardoteixeira@gmail.com', password: '123' })).rejects.toBeInstanceOf(AppError)
  })

})