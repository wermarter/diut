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
import { PrintFormSchema } from './print-form'
import { TestSchema } from './test'
import { TestElementSchema } from './test-element'
import { PatientSchema } from './patient'
import { TestComboSchema } from './test-combo'

export const COLLECTION_CLASS: Record<COLLECTION, typeof BaseSchema> = {
  [COLLECTION.BIO_PRODUCT]: BioProductSchema,
  [COLLECTION.INSTRUMENT]: InstrumentSchema,
  [COLLECTION.ROLE]: RoleSchema,
  [COLLECTION.DOCTOR]: DoctorSchema,
  [COLLECTION.DIAGNOSIS]: DiagnosisSchema,
  [COLLECTION.PATIENT]: PatientSchema,
  [COLLECTION.PATIENT_TYPE]: PatientTypeSchema,
  // [COLLECTION.SAMPLE]: Sample,
  [COLLECTION.SAMPLE_TYPE]: SampleTypeSchema,
  [COLLECTION.TEST]: TestSchema,
  [COLLECTION.TEST_CATEGORY]: TestCategorySchema,
  [COLLECTION.TEST_COMBO]: TestComboSchema,
  [COLLECTION.TEST_ELEMENT]: TestElementSchema,
  [COLLECTION.USER]: UserSchema,
  [COLLECTION.PRINT_FORM]: PrintFormSchema,
  [COLLECTION.BRANCH]: BranchSchema,
}
