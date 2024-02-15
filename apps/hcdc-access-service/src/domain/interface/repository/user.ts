import { User } from '@diut/hcdc'

import { IRepository } from './interface'

export const UserRepositoryToken = Symbol('UserRepository')

export interface IUserRepository extends IRepository<User> {}
