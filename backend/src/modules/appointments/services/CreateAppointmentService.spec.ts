import AppError from '@shared/errors/AppError'
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(fakeAppointmentsRepository);
  })

  it('Should be able to create a new appointment', async () => {

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    })
    const appointment = await createAppointmentService.execute({ date: new Date(2020, 4, 10, 14), user_id: 1, provider_id: 2 })
    expect(appointment).toHaveProperty('id');
  })

  it('Should not be able to create a new appointment on same time', async () => {

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    })
    const appointmentDate = new Date(2020, 4, 10, 14);
    await createAppointmentService.execute({ date: appointmentDate, user_id: 1, provider_id: 2 })
    await expect(createAppointmentService.execute({ date: appointmentDate, user_id: 1, provider_id: 2 })).rejects.toBeInstanceOf(AppError);

  })

  it('Should not be able to create a new appointment on a past date', async () => {

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    })
    await expect(createAppointmentService.execute({ date: new Date(2020, 4, 10, 11), user_id: 1, provider_id: 2 })).rejects.toBeInstanceOf(AppError);

  })

  it('Should not be able to create a new appointment with same user as provider', async () => {

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    })
    await expect(createAppointmentService.execute({ date: new Date(2020, 4, 10, 13), user_id: 1, provider_id: 1 })).rejects.toBeInstanceOf(AppError);

  })

  it('Should not be able to create a new appointment before 8am', async () => {

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    })
    await expect(createAppointmentService.execute({ date: new Date(2020, 4, 11, 7), user_id: 1, provider_id: 1 })).rejects.toBeInstanceOf(AppError);

  })
})