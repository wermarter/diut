import { SampleType } from '@diut/hcdc'

import { IRepository } from './interface'

export const SampleTypeRepositoryToken = Symbol('SampleTypeRepository')

export interface ISampleTypeRepository extends IRepository<SampleType> {}
