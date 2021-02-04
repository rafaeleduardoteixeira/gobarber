import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import CreateUserservice from '@modules/users/services/CreateUserService'

describe('CreateUser', () => {
  it('Should be able to create a new user', async () => {

    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserservice = new CreateUserservice(fakeUsersRepository, fakeHashProvider);
    const user = await createUserservice.execute({ name: 'Rafael Teixeira', email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' })

    expect(user).toHaveProperty('id');
  })

  it('Should be able to create a new user with duplicate email', async () => {

    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserservice = new CreateUserservice(fakeUsersRepository, fakeHashProvider);
    await createUserservice.execute({ name: 'Rafael Teixeira', email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' })

    expect(createUserservice.execute({ name: 'Rafael Teixeira', email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' })).rejects.toBeInstanceOf(AppError);
  })

})