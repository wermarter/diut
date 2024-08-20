import { Doctor } from '@diut/hcdc'

import { IRepository } from './interface'

export const DOCTOR_REPO_TOKEN = Symbol('DoctorRepository')

export interface IDoctorRepository extends IRepository<Doctor> {}
