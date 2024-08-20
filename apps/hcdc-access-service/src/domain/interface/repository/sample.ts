import { Sample } from '@diut/hcdc'

import { IRepository } from './interface'

export const SAMPLE_REPO_TOKEN = Symbol('SampleRepository')

export interface ISampleRepository extends IRepository<Sample> {}
