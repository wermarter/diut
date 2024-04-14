import { TestCombo } from '@diut/hcdc'

import { IRepository } from './interface'

export const TestComboRepositoryToken = Symbol('TestComboRepository')

export interface ITestComboRepository extends IRepository<TestCombo> {}
