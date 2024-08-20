import { Role } from '@diut/hcdc'

import { IRepository } from './interface'

export const ROLE_REPO_TOKEN = Symbol('RoleRepository')

export interface IRoleRepository extends IRepository<Role> {}
