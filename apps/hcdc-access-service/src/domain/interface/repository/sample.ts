import { Sample } from 'src/domain/entity'
import { IRepository } from './interface'

export const SampleRepositoryToken = Symbol('SampleRepository')

export interface ISampleRepository extends IRepository<Sample> {}
