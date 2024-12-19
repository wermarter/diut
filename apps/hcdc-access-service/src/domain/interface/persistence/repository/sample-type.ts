import { SampleType } from '@diut/hcdc'
import { IRepository } from './interface'

export const SAMPLETYPE_REPO_TOKEN = Symbol('SAMPLETYPE_REPO_TOKEN')

export interface ISampleTypeRepository extends IRepository<SampleType> {}
