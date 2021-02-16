import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import ShowProfileService from '@modules/users/services/ShowProfileService'

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  })

  it('Should be able show profile', async () => {

    const user = await fakeUsersRepository.create({ name: 'Rafael Teixeira', email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' })
    const profile = await showProfileService.execute({ user_id: user.id })
    expect(profile.name).toBe('Rafael Teixeira');

  })


  it('Should be able show profile from non-existing user', async () => {
    await expect(showProfileService.execute({ user_id: 1 })).rejects.toBeInstanceOf(AppError);
  })

})