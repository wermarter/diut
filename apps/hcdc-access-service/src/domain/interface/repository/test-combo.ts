import { TestCombo } from '@diut/hcdc'

import { IRepository } from './interface'

export const TESTCOMBO_REPO_TOKEN = Symbol('TestComboRepository')

export interface ITestComboRepository extends IRepository<TestCombo> {}
