import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService'

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentsService = new ListProviderAppointmentsService(fakeAppointmentsRepository);
  })

  it('Should be able to list the appointments of the day ', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({ user_id: 1, provider_id: 2, date: new Date(2020, 4, 20, 8, 0, 0) })
    const appointment2 = await fakeAppointmentsRepository.create({ user_id: 1, provider_id: 2, date: new Date(2020, 4, 20, 10, 0, 0) })

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 2,
      year: 2020,
      month: 5,
      day: 20
    })

    await expect(appointments).toEqual(expect.arrayContaining([
      appointment1,
      appointment2
    ]))
  })
})