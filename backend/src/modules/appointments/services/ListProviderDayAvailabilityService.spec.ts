import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService'

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(fakeAppointmentsRepository);
  })

  it('Should be able to list the day availability from provider ', async () => {
    await fakeAppointmentsRepository.create({ user_id: 1, provider_id: 2, date: new Date(2020, 4, 20, 8, 0, 0) })
    await fakeAppointmentsRepository.create({ user_id: 1, provider_id: 2, date: new Date(2020, 4, 20, 10, 0, 0) })

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 20, 11).getTime();
    })


    const availability = await listProviderDayAvailabilityService.execute({
      year: 2020,
      day: 20,
      month: 5,
      provider_id: 1
    })

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, available: false },
      { hour: 9, available: false },
      { hour: 10, available: false },
      { hour: 11, available: false },
      { hour: 12, available: true },
      { hour: 14, available: true },
      { hour: 15, available: true },
    ]))
  })

})