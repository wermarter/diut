import { TestElement } from 'src/domain/entity'
import { IRepository } from './interface'

export const TestElementRepositoryToken = Symbol('TestElementRepository')

export interface ITestElementRepository extends IRepository<TestElement> {}
