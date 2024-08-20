import { SampleType } from '@diut/hcdc'

import { IRepository } from './interface'

export const SAMPLETYPE_REPO_TOKEN = Symbol('SampleTypeRepository')

export interface ISampleTypeRepository extends IRepository<SampleType> {}
