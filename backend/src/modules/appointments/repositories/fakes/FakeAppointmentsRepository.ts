import { isEqual } from 'date-fns'
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date),)
    return findAppointment;
  }

  public async create({ date, provider_id }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();
    appointment.date = date;
    appointment.provider_id = provider_id;
    if (this.appointments) {
      if (this.appointments.length > 0) {
        appointment.id = this.appointments[this.appointments.length - 1].id + 1;
      } else {
        appointment.id = 1
      }
    }
    this.appointments.push(appointment);
    return appointment
  }

  public async find(): Promise<Appointment[]> {
    return this.appointments
  }
}

export default FakeAppointmentsRepository;
