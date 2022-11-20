import { ClassConstructor } from 'class-transformer'
import { BaseSchema } from 'src/clients/mongo'

import { BioProduct } from 'src/resources/bio-products'
import { Doctor } from 'src/resources/doctors'
import { Indication } from 'src/resources/indications'
import { PatientType } from 'src/resources/patient-types'
import { Patient } from 'src/resources/patients'
import { PrintForm } from 'src/resources/print-forms'
import { SampleType } from 'src/resources/sample-types'
import { Sample } from 'src/resources/samples'
import { TestCategory } from 'src/resources/test-categories'
import { TestCombo } from 'src/resources/test-combos'
import { TestElement } from 'src/resources/test-elements'
import { Test } from 'src/resources/tests'
import { User } from 'src/resources/users'
import { COLLECTION } from './collections'

export const COLLECTION_CLASS: Record<
  COLLECTION,
  ClassConstructor<BaseSchema>
> = {
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
