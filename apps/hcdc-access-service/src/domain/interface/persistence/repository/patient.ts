import { Patient } from '@diut/hcdc'
import { IRepository } from './interface'

export const PATIENT_REPO_TOKEN = Symbol('PATIENT_REPO_TOKEN')

export interface IPatientRepository extends IRepository<Patient> {}
