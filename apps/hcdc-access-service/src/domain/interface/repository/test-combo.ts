import { TestCombo } from 'src/domain/entity'
import { IRepository } from './interface'

export const TestComboRepositoryToken = Symbol('TestComboRepository')

export interface ITestComboRepository extends IRepository<TestCombo> {}
