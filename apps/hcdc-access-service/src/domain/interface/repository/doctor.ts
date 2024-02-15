import { Doctor } from '@diut/hcdc'

import { IRepository } from './interface'

export const DoctorRepositoryToken = Symbol('DoctorRepository')

export interface IDoctorRepository extends IRepository<Doctor> {}
