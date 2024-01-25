import { Doctor } from 'src/domain/entity'
import { IRepository } from './interface'

export const DoctorRepositoryToken = Symbol('DoctorRepository')

export interface IDoctorRepository extends IRepository<Doctor> {}
