import { Sample } from '@diut/hcdc'

import { IRepository } from './interface'

export const SAMPLE_REPO_TOKEN = Symbol('SAMPLE_REPO_TOKEN')

export interface ISampleRepository extends IRepository<Sample> {}
