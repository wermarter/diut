import { TestCategory } from 'src/domain/entity'
import { IRepository } from './interface'

export const TestCategoryRepositoryToken = Symbol('TestCategoryRepository')

export interface ITestCategoryRepository extends IRepository<TestCategory> {}
