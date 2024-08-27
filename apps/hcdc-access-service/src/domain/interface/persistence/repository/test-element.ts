import { TestElement } from '@diut/hcdc'

import { IRepository } from './interface'

export const TESTELEMENT_REPO_TOKEN = Symbol('TESTELEMENT_REPO_TOKEN')

export interface ITestElementRepository extends IRepository<TestElement> {}
