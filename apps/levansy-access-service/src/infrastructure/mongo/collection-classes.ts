import { BaseSchema } from '@diut/nest-core'

import { COLLECTION } from './collections'
import { BioProductSchema } from './bio-product'
import { TestCategorySchema } from './test-category'

export const COLLECTION_CLASS: Record<COLLECTION, typeof BaseSchema> = {
  [COLLECTION.BIO_PRODUCT]: BioProductSchema,
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
  // [COLLECTION.USER]: User,
  // [COLLECTION.PRINT_FORM]: PrintForm,
  // [COLLECTION.SAMPLE_ORIGIN]: SampleOrigin,
}
