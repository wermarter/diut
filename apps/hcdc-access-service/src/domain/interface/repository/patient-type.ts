import { PatientType } from '@diut/hcdc'

import { IRepository } from './interface'

export const PatientTypeRepositoryToken = Symbol('PatientTypeRepository')

export interface IPatientTypeRepository extends IRepository<PatientType> {}
