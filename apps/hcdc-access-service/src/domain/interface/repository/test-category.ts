import { TestCategory } from '@diut/hcdc'

import { IRepository } from './interface'

export const TestCategoryRepositoryToken = Symbol('TestCategoryRepository')

export interface ITestCategoryRepository extends IRepository<TestCategory> {}
