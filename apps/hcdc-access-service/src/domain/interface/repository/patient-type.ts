import { PatientType } from '@diut/hcdc'

import { IRepository } from './interface'

export const PATIENTTYPE_REPO_TOKEN = Symbol('PatientTypeRepository')

export interface IPatientTypeRepository extends IRepository<PatientType> {}
