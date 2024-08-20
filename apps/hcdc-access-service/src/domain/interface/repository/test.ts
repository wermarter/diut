import { Test } from '@diut/hcdc'

import { IRepository } from './interface'

export const TEST_REPO_TOKEN = Symbol('TestRepository')

export interface ITestRepository extends IRepository<Test> {}
