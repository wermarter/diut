import { Role } from '@diut/hcdc'

import { IRepository } from './interface'

export const RoleRepositoryToken = Symbol('RoleRepository')

export interface IRoleRepository extends IRepository<Role> {}
