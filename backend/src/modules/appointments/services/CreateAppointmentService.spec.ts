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

    const appointment = await createAppointmentService.execute({ date: new Date(), provider_id: '123' })

    expect(appointment).toHaveProperty('id');
  })

  it('Should not be able to create a new appointment on same time', async () => {

    const appointmentDate = new Date(2020, 4, 10, 11);
    await createAppointmentService.execute({ date: appointmentDate, provider_id: '123' })

    expect(createAppointmentService.execute({ date: appointmentDate, provider_id: '123' })).rejects.toBeInstanceOf(AppError);
  })
})