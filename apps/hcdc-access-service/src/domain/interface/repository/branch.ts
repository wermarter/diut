import { Branch } from 'src/domain/entity'
import { IRepository } from './interface'

export const BranchRepositoryToken = Symbol('BranchRepository')

export interface IBranchRepository extends IRepository<Branch> {}
