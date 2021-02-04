import { container } from 'tsyringe'
import '@modules/users/providers/index'
import '@shared/container/index'

import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentsRepository";
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

import UserRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import IUsersRepository from '@modules/users/repositories/IUsersRepository'


container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository)
container.registerSingleton<IUsersRepository>('UserRepository', UserRepository)