import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService'

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(fakeAppointmentsRepository);
  })

  it('Should be able to list the month availability from provider ', async () => {
    await fakeAppointmentsRepository.create({ user_id: 1, provider_id: 2, date: new Date(2020, 4, 20, 8, 0, 0) })
    await fakeAppointmentsRepository.create({ user_id: 1, provider_id: 2, date: new Date(2020, 4, 20, 9, 0, 0) })
    await fakeAppointmentsRepository.create({ user_id: 1, provider_id: 2, date: new Date(2020, 4, 20, 10, 0, 0) })
    await fakeAppointmentsRepository.create({ user_id: 1, provider_id: 2, date: new Date(2020, 4, 20, 11, 0, 0) })
    await fakeAppointmentsRepository.create({ user_id: 1, provider_id: 2, date: new Date(2020, 4, 20, 12, 0, 0) })
    await fakeAppointmentsRepository.create({ user_id: 1, provider_id: 2, date: new Date(2020, 4, 20, 13, 0, 0) })
    await fakeAppointmentsRepository.create({ user_id: 1, provider_id: 2, date: new Date(2020, 4, 20, 14, 0, 0) })
    await fakeAppointmentsRepository.create({ user_id: 1, provider_id: 2, date: new Date(2020, 4, 20, 15, 0, 0) })
    await fakeAppointmentsRepository.create({ user_id: 1, provider_id: 2, date: new Date(2020, 4, 20, 16, 0, 0) })
    await fakeAppointmentsRepository.create({ user_id: 1, provider_id: 2, date: new Date(2020, 4, 20, 17, 0, 0) })
    await fakeAppointmentsRepository.create({ user_id: 1, provider_id: 2, date: new Date(2020, 4, 21, 9, 0, 0) })

    const availability = await listProviderMonthAvailabilityService.execute({
      year: 2020,
      month: 5,
      provider_id: 1
    })

    expect(availability).toEqual(expect.arrayContaining([
      { day: 20, available: false },
      { day: 21, available: true },
    ]))
  })
})