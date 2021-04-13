import { startOfHour, isBefore, getHours, format } from "date-fns";
import AppError from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'

interface IRequest {
  provider_id: number;
  user_id: number;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(@inject('AppointmentsRepository') private appointmentsRepository: IAppointmentsRepository,
    @inject('NotificationsRepository') private notificationsRepository: INotificationsRepository) {
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

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate, provider_id);
    if (findAppointmentInSameDate) {
      throw new AppError("This appointment is already booked.");
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const dateFormatted = format(appointment.date, "dd/MM/yyyy 'às' HH:mm'h'")

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateFormatted}`

    })

    return appointment;
  }
}

export default CreateAppointmentService;
