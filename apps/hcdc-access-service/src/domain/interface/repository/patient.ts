import { Patient } from 'src/domain/entity'
import { IRepository } from './interface'

export const PatientRepositoryToken = Symbol('PatientRepository')

export interface IPatientRepository extends IRepository<Patient> {}
