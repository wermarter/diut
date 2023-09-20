import { BaseSchema } from 'src/clients/mongo'

import { COLLECTION } from './collections'
import { BioProduct } from './bio-products/bio-product.schema'
import { Doctor } from './doctors/doctor.schema'
import { Indication } from './indications/indication.schema'
import { Patient } from './patients/patient.schema'
import { PatientType } from './patient-types/patient-type.schema'
import { Sample } from './samples/sample.schema'
import { SampleType } from './sample-types/sample-type.schema'
import { Test } from './tests/test.schema'
import { TestCategory } from './test-categories/test-category.schema'
import { TestCombo } from './test-combos/test-combo.schema'
import { TestElement } from './test-elements/test-element.schema'
import { User } from './users/user.schema'
import { PrintForm } from './print-forms/print-form.schema'

export const COLLECTION_CLASS: Record<COLLECTION, typeof BaseSchema> = {
  [COLLECTION.BIO_PRODUCT]: BioProduct,
  [COLLECTION.DOCTOR]: Doctor,
  [COLLECTION.INDICATION]: Indication,
  [COLLECTION.PATIENT]: Patient,
  [COLLECTION.PATIENT_TYPE]: PatientType,
  [COLLECTION.SAMPLE]: Sample,
  [COLLECTION.SAMPLE_TYPE]: SampleType,
  [COLLECTION.TEST]: Test,
  [COLLECTION.TEST_CATEGORY]: TestCategory,
  [COLLECTION.TEST_COMBO]: TestCombo,
  [COLLECTION.TEST_ELEMENT]: TestElement,
  [COLLECTION.USER]: User,
  [COLLECTION.PRINT_FORM]: PrintForm,
}
