import { User } from 'src/domain/entity'
import { IRepository } from './interface'

export const UserRepositoryToken = Symbol('UserRepository')

export interface IUserRepository extends IRepository<User> {}
