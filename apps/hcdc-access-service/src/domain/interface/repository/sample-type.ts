import { SampleType } from 'src/domain/entity'
import { IRepository } from './interface'

export const SampleTypeRepositoryToken = Symbol('SampleTypeRepository')

export interface ISampleTypeRepository extends IRepository<SampleType> {}
