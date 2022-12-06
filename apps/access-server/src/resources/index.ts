import { BioProductModule } from './bio-products/bio-product.module'
import { DoctorModule } from './doctors/doctor.module'
import { IndicationModule } from './indications/indication.module'
import { PatientTypeModule } from './patient-types/patient-type.module'
import { PatientModule } from './patients/patient.module'
import { PrintFormModule } from './print-forms/print-form.module'
import { SampleTypeModule } from './sample-types/sample-type.module'
import { SampleModule } from './samples/sample.module'
import { TestCategoryModule } from './test-categories/test-category.module'
import { TestComboModule } from './test-combos/test-combo.module'
import { TestElementModule } from './test-elements/test-element.module'
import { TestModule } from './tests/test.module'
import { UserModule } from './users/user.module'

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
