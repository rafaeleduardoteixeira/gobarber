import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import ListProvidersService from '@modules/appointments/services/ListProvidersService'

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(fakeUsersRepository);
  })

  it('Should be able to list the providers ', async () => {

    const user1 = await fakeUsersRepository.create({ name: 'Rafael Teixeira', email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' })
    const user2 = await fakeUsersRepository.create({ name: 'Jessica Teixeira', email: 'jessicateixeira@gmail.com', password: 'admin' })
    const userLogged = await fakeUsersRepository.create({ name: 'Davi Teixeira', email: 'daviteixeira@gmail.com', password: 'admin' })
    const providers = await listProvidersService.execute({ user_id: userLogged.id })
    expect(providers).toEqual([user1, user2]);

  })
})