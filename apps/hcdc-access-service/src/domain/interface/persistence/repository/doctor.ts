import { Doctor } from '@diut/hcdc'

import { IRepository } from './interface'

export const DOCTOR_REPO_TOKEN = Symbol('DOCTOR_REPO_TOKEN')

export interface IDoctorRepository extends IRepository<Doctor> {}
