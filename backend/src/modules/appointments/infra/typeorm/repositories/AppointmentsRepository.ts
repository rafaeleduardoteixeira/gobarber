import { getRepository, Repository, Raw } from "typeorm";
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO'

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;
  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date: date },
    });
    return findAppointment;
  }

  public async findAllInMonthFromProvider({ provider_id, year, month }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = this.ormRepository.createQueryBuilder("appointment")
      .where("appointment.provider_id = :provider_id", { provider_id })
      .andWhere(`DATE_FORMAT(date, '%%m-%Y')='${parsedMonth}-${year}'`)
      .getMany()
    return appointments;
  }


  public async findAllInDayFromProvider({ provider_id, year, month, day }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');
    const appointments = this.ormRepository.createQueryBuilder("appointment")
      .where("appointment.provider_id = :provider_id", { provider_id })
      .andWhere(`DATE_FORMAT(date, '%d-%m-%Y')='${parsedDay}-${parsedMonth}-${year}'`)
      .getMany()
    return appointments;
  }


  public async create({ date, provider_id, user_id }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ user_id, provider_id, date })
    await this.ormRepository.save(appointment)
    return appointment
  }

  public async find(): Promise<Appointment[]> {
    const appointments = this.ormRepository.find()
    return appointments
  }
}

export default AppointmentsRepository;
