import { TestCombo } from '@diut/hcdc'

import { IRepository } from './interface'

export const TESTCOMBO_REPO_TOKEN = Symbol('TESTCOMBO_REPO_TOKEN')

export interface ITestComboRepository extends IRepository<TestCombo> {}
