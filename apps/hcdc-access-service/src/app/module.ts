import { concatModuleMetadata } from '@diut/nestjs-infra'

import { authMetadata } from './auth'
import { bioProductMetadata } from './bio-product'
import { branchMetadata } from './branch'
import { diagnosisMetadata } from './diagnosis'
import { doctorMetadata } from './doctor'
import { instrumentMetadata } from './instrument'
import { patientMetadata } from './patient'
import { patientTypeMetadata } from './patient-type'
import { printFormMetadata } from './print-form'
import { roleMetadata } from './role'
import { sampleMetadata } from './sample'
import { sampleTypeMetadata } from './sample-type'
import { testMetadata } from './test'
import { testCategoryMetadata } from './test-category'
import { testComboMetadata } from './test-combo'
import { testElementMetadata } from './test-element'
import { userMetadata } from './user'
import { exampleServiceMetadata } from './example-service'

export const appMetadata = concatModuleMetadata([
  authMetadata,
  bioProductMetadata,
  branchMetadata,
  diagnosisMetadata,
  doctorMetadata,
  instrumentMetadata,
  patientMetadata,
  patientTypeMetadata,
  printFormMetadata,
  roleMetadata,
  sampleMetadata,
  sampleTypeMetadata,
  testMetadata,
  testCategoryMetadata,
  testComboMetadata,
  testElementMetadata,
  userMetadata,
  exampleServiceMetadata,
])
