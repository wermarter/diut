import { Branch } from '@diut/hcdc'
import { IRepository } from './interface'

export const BRANCH_REPO_TOKEN = Symbol('BRANCH_REPO_TOKEN')

export interface IBranchRepository extends IRepository<Branch> {}
