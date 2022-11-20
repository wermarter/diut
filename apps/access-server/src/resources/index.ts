import { BioProductModule } from './bio-products'
import { DoctorModule } from './doctors'
import { IndicationModule } from './indications'
import { PatientTypeModule } from './patient-types'
import { PatientModule } from './patients'
import { PrintFormModule } from './print-forms'
import { SampleTypeModule } from './sample-types'
import { SampleModule } from './samples'
import { TestCategoryModule } from './test-categories'
import { TestComboModule } from './test-combos'
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
  BioProductModule,
  SampleTypeModule,
  TestComboModule,
  PatientModule,
  SampleModule,
  PrintFormModule,
]
