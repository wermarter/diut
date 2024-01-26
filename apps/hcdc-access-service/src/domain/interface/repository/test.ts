import { Test } from 'src/domain/entity'
import { IRepository } from './interface'

export const TestRepositoryToken = Symbol('TestRepository')

export interface ITestRepository extends IRepository<Test> {}
