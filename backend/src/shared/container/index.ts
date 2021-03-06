import { container } from 'tsyringe'
import '@modules/users/providers/index'
import '@shared/container/providers/index'

import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentsRepository";
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

import UserRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import UserTokensRepository from "@modules/users/infra/typeorm/repositories/UserTokensRepository";
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'

container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository)
container.registerSingleton<IUsersRepository>('UserRepository', UserRepository)
container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository)