import { Diagnosis } from '@diut/hcdc'

import { IRepository } from './interface'

export const DIAGNOSIS_REPO_TOKEN = Symbol('DiagnosisRepository')

export interface IDiagnosisRepository extends IRepository<Diagnosis> {}
