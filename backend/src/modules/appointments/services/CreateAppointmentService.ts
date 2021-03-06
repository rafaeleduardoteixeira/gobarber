import { startOfHour, isBefore, getHours } from "date-fns";
import AppError from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

interface IRequest {
  provider_id: number;
  user_id: number;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(@inject('AppointmentsRepository') private appointmentsRepository: IAppointmentsRepository) {
  }

  public async execute({ date, provider_id, user_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You cant't create an appointment on a past date.");
    }

    if (user_id == provider_id) {
      throw new AppError("You cant't create an appointment with yourself.");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError("You cant't create an appointment before 8am and after 5pm.");
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);
    if (findAppointmentInSameDate) {
      throw new AppError("This appointment is aready booked.");
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
