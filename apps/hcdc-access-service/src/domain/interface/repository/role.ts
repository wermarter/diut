import { Role } from 'src/domain/entity'
import { IRepository } from './interface'

export const RoleRepositoryToken = Symbol('RoleRepository')

export interface IRoleRepository extends IRepository<Role> {}
