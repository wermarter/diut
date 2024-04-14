import { Patient } from '@diut/hcdc'

import { IRepository } from './interface'

export const PatientRepositoryToken = Symbol('PatientRepository')

export interface IPatientRepository extends IRepository<Patient> {}
