import { DoctorModule } from './doctors'
import { IndicationModule } from './indications'
import { PatientTypeModule } from './patient-types'
import { TestCategoryModule } from './test-categories'
import { TestElementModule } from './test-elements'
import { TestModule } from './tests'
import { UserModule } from './users'

export const resourceModules = [
  UserModule,
  PatientTypeModule,
  DoctorModule,
  TestCategoryModule,
  TestModule,
  TestElementModule,
  IndicationModule,
]
