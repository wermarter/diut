import { Diagnosis } from '@diut/hcdc'
import { IRepository } from './interface'

export const DIAGNOSIS_REPO_TOKEN = Symbol('DIAGNOSIS_REPO_TOKEN')

export interface IDiagnosisRepository extends IRepository<Diagnosis> {}
