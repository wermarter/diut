import { Diagnosis } from '@diut/hcdc'

import { IRepository } from './interface'

export const DiagnosisRepositoryToken = Symbol('DiagnosisRepository')

export interface IDiagnosisRepository extends IRepository<Diagnosis> {}
