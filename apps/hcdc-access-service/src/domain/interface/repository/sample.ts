import { Sample } from '@diut/hcdc'

import { IRepository } from './interface'

export const SampleRepositoryToken = Symbol('SampleRepository')

export interface ISampleRepository extends IRepository<Sample> {}
