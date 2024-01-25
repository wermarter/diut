import { BaseSchema } from '@diut/nest-core'

import { COLLECTION } from './collections'
import { BioProductSchema } from './bio-product'
import { TestCategorySchema } from './test-category'
import { UserSchema } from './user'
import { BranchSchema } from './branch'
import { RoleSchema } from './role'
import { InstrumentSchema } from './instrument'
import { SampleTypeSchema } from './sample-type'
import { DoctorSchema } from './doctor'
import { PatientTypeSchema } from './patient-type'
import { DiagnosisSchema } from './diagnosis'

export const COLLECTION_CLASS: Record<COLLECTION, typeof BaseSchema> = {
  [COLLECTION.BIO_PRODUCT]: BioProductSchema,
  [COLLECTION.INSTRUMENT]: InstrumentSchema,
  [COLLECTION.ROLE]: RoleSchema,
  [COLLECTION.DOCTOR]: DoctorSchema,
  [COLLECTION.DIAGNOSIS]: DiagnosisSchema,
  // [COLLECTION.PATIENT]: Patient,
  [COLLECTION.PATIENT_TYPE]: PatientTypeSchema,
  // [COLLECTION.SAMPLE]: Sample,
  [COLLECTION.SAMPLE_TYPE]: SampleTypeSchema,
  // [COLLECTION.TEST]: Test,
  [COLLECTION.TEST_CATEGORY]: TestCategorySchema,
  // [COLLECTION.TEST_COMBO]: TestCombo,
  // [COLLECTION.TEST_ELEMENT]: TestElement,
  [COLLECTION.USER]: UserSchema,
  // [COLLECTION.PRINT_FORM]: PrintForm,
  // [COLLECTION.SAMPLE_ORIGIN]: SampleOrigin,
  [COLLECTION.BRANCH]: BranchSchema,
}
