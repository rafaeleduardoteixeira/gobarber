import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import UpdateProfileService from '@modules/users/services/UpdateProfileService'

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
  })

  it('Should be able update user', async () => {

    const user = await fakeUsersRepository.create({ name: 'Rafael Teixeira', email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' })
    await updateProfileService.execute({ user_id: user.id, name: 'Rafael Eduardo Teixeira', email: 'rafaeleduardoteixeira@gmail.com' })
    expect(user.name).toBe('Rafael Eduardo Teixeira');

  })

  it('Should be able to update email', async () => {

    await fakeUsersRepository.create({ name: 'Rafael Teixeira', email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' })
    const user = await fakeUsersRepository.create({ name: 'Rafael Teixeira', email: 'teste@gmail.com', password: 'admin' })
    await expect(updateProfileService.execute({ user_id: user.id, name: 'Rafael Eduardo Teixeira', email: 'rafaeleduardoteixeira@gmail.com' })).rejects.toBeInstanceOf(AppError)

  })


  it('Should be able update password', async () => {

    const user = await fakeUsersRepository.create({ name: 'Rafael Teixeira', email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' })
    const updateUser = await updateProfileService.execute({ user_id: user.id, name: 'Rafael Eduardo Teixeira', email: 'rafaeleduardoteixeira@gmail.com', oldPassword: 'admin', password: '123' })
    expect(updateUser?.password).toBe('123');

  })

  it('Should not be able update password withount old password', async () => {

    const user = await fakeUsersRepository.create({ name: 'Rafael Teixeira', email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' })
    expect(updateProfileService.execute({ user_id: user.id, name: 'Rafael Eduardo Teixeira', email: 'rafaeleduardoteixeira@gmail.com', password: '123' })).rejects.toBeInstanceOf(AppError);

  })

  it('Should not be able update password wrong old password', async () => {

    const user = await fakeUsersRepository.create({ name: 'Rafael Teixeira', email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' })
    expect(updateProfileService.execute({ user_id: user.id, name: 'Rafael Eduardo Teixeira', email: 'rafaeleduardoteixeira@gmail.com', oldPassword: 'admin123', password: '123' })).rejects.toBeInstanceOf(AppError);

  })

  it('Should be able show profile from non-existing user', async () => {
    await expect(updateProfileService.execute({ user_id: 1, name: 'Rafael Eduardo Teixeira', email: 'rafaeleduardoteixeira@gmail.com', oldPassword: 'admin123', password: '123' })).rejects.toBeInstanceOf(AppError);
  })
})