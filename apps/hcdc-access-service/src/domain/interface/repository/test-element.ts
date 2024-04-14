import { TestElement } from '@diut/hcdc'

import { IRepository } from './interface'

export const TestElementRepositoryToken = Symbol('TestElementRepository')

export interface ITestElementRepository extends IRepository<TestElement> {}
