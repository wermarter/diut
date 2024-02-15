import { Branch } from '@diut/hcdc'

import { IRepository } from './interface'

export const BranchRepositoryToken = Symbol('BranchRepository')

export interface IBranchRepository extends IRepository<Branch> {}
