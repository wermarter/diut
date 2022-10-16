import { DoctorModule } from './doctors'
import { PatientTypeModule } from './patient-types'
import { TestCategoryModule } from './test-categories'
import { UserModule } from './users'

export const resourceModules = [
  UserModule,
  PatientTypeModule,
  DoctorModule,
  TestCategoryModule,
]
