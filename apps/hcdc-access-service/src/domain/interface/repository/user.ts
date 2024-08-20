import { User } from '@diut/hcdc'

import { IRepository } from './interface'

export const USER_REPO_TOKEN = Symbol('UserRepository')

export interface IUserRepository extends IRepository<User> {}
