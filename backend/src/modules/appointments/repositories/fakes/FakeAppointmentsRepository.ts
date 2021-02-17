import { isEqual, getMonth, getYear, getDate } from 'date-fns'
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO'

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date),)
    return findAppointment;
  }

  public async findAllInMonthFromProvider({ provider_id, year, month }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment =>
      appointment.provider_id == provider_id &&
      getMonth(appointment.date) + 1 == month &&
      getYear(appointment.date) == year
    )
    return appointments;
  }

  public async findAllInDayFromProvider({ provider_id, year, month, day }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment =>
      appointment.provider_id == provider_id &&
      getDate(appointment.date) == day &&
      getMonth(appointment.date) + 1 == month &&
      getYear(appointment.date) == year
    )
    return appointments;
  }

  public async create({ date, provider_id, user_id }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();
    appointment.date = date;
    appointment.provider_id = provider_id;
    appointment.user_id = user_id;
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
