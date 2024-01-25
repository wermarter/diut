import { Diagnosis } from 'src/domain/entity'
import { IRepository } from './interface'

export const DiagnosisRepositoryToken = Symbol('DiagnosisRepository')

export interface IDiagnosisRepository extends IRepository<Diagnosis> {}
