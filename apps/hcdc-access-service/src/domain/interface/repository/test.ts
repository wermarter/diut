import { Test } from '@diut/hcdc'

import { IRepository } from './interface'

export const TestRepositoryToken = Symbol('TestRepository')

export interface ITestRepository extends IRepository<Test> {}
