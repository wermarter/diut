import { BaseSchema } from '@diut/nestjs-infra'

import { BioProductSchema } from './bio-product'
import { BranchSchema } from './branch'
import { COLLECTION } from './collections'
import { DiagnosisSchema } from './diagnosis'
import { DoctorSchema } from './doctor'
import { InstrumentSchema } from './instrument'
import { PatientSchema } from './patient'
import { PatientTypeSchema } from './patient-type'
import { PrintFormSchema } from './print-form'
import { RoleSchema } from './role'
import { SampleSchema } from './sample'
import { SampleTypeSchema } from './sample-type'
import { TestSchema } from './test'
import { TestCategorySchema } from './test-category'
import { TestComboSchema } from './test-combo'
import { TestElementSchema } from './test-element'
import { UserSchema } from './user'

export const COLLECTION_CLASS = {
  [COLLECTION.BIO_PRODUCT]: BioProductSchema,
  [COLLECTION.INSTRUMENT]: InstrumentSchema,
  [COLLECTION.ROLE]: RoleSchema,
  [COLLECTION.DOCTOR]: DoctorSchema,
  [COLLECTION.DIAGNOSIS]: DiagnosisSchema,
  [COLLECTION.PATIENT]: PatientSchema,
  [COLLECTION.PATIENT_TYPE]: PatientTypeSchema,
  [COLLECTION.SAMPLE]: SampleSchema,
  [COLLECTION.SAMPLE_TYPE]: SampleTypeSchema,
  [COLLECTION.TEST]: TestSchema,
  [COLLECTION.TEST_CATEGORY]: TestCategorySchema,
  [COLLECTION.TEST_COMBO]: TestComboSchema,
  [COLLECTION.TEST_ELEMENT]: TestElementSchema,
  [COLLECTION.USER]: UserSchema,
  [COLLECTION.PRINT_FORM]: PrintFormSchema,
  [COLLECTION.BRANCH]: BranchSchema,
} satisfies Record<COLLECTION, typeof BaseSchema>
