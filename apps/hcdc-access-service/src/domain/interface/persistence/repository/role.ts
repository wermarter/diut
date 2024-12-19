import { Role } from '@diut/hcdc'
import { IRepository } from './interface'

export const ROLE_REPO_TOKEN = Symbol('ROLE_REPO_TOKEN')

export interface IRoleRepository extends IRepository<Role> {}
