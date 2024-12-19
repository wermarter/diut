import { TestCategory } from '@diut/hcdc'
import { IRepository } from './interface'

export const TESTCATEGORY_REPO_TOKEN = Symbol('TESTCATEGORY_REPO_TOKEN')

export interface ITestCategoryRepository extends IRepository<TestCategory> {}
