import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import ICreateAppointmenteDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmenteDTO): Promise<Appointment>;
    find(): Promise<Appointment[]>;
    findByDate(date: Date): Promise<Appointment | undefined>
}