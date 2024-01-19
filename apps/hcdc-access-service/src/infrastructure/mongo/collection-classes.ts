import { BaseSchema } from '@diut/nest-core'

import { COLLECTION } from './collections'
import { BioProductSchema } from './bio-product'
import { TestCategorySchema } from './test-category'
import { UserSchema } from './user'
import { BranchSchema } from './branch'
import { RoleSchema } from './role'

export const COLLECTION_CLASS: Record<COLLECTION, typeof BaseSchema> = {
  [COLLECTION.BIO_PRODUCT]: BioProductSchema,
  [COLLECTION.ROLE]: RoleSchema,
  // [COLLECTION.DOCTOR]: Doctor,
  // [COLLECTION.INDICATION]: Indication,
  // [COLLECTION.PATIENT]: Patient,
  // [COLLECTION.PATIENT_TYPE]: PatientType,
  // [COLLECTION.SAMPLE]: Sample,
  // [COLLECTION.SAMPLE_TYPE]: SampleType,
  // [COLLECTION.TEST]: Test,
  [COLLECTION.TEST_CATEGORY]: TestCategorySchema,
  // [COLLECTION.TEST_COMBO]: TestCombo,
  // [COLLECTION.TEST_ELEMENT]: TestElement,
  [COLLECTION.USER]: UserSchema,
  // [COLLECTION.PRINT_FORM]: PrintForm,
  // [COLLECTION.SAMPLE_ORIGIN]: SampleOrigin,
  [COLLECTION.BRANCH]: BranchSchema,
}
