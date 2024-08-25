import { PatientType } from '@diut/hcdc'

import { IRepository } from './interface'

export const PATIENTTYPE_REPO_TOKEN = Symbol('PATIENTTYPE_REPO_TOKEN')

export interface IPatientTypeRepository extends IRepository<PatientType> {}
