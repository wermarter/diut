import { PatientType } from 'src/domain/entity'
import { IRepository } from './interface'

export const PatientTypeRepositoryToken = Symbol('PatientTypeRepository')

export interface IPatientTypeRepository extends IRepository<PatientType> {}
