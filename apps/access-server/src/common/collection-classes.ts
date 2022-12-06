import { ClassConstructor } from 'class-transformer'
import { BaseSchema } from 'src/clients/mongo'

import { BioProduct } from 'src/resources/bio-products/bio-product.schema'
import { Doctor } from 'src/resources/doctors/doctor.schema'
import { Indication } from 'src/resources/indications/indication.schema'
import { PatientType } from 'src/resources/patient-types/patient-type.schema'
import { Patient } from 'src/resources/patients/patient.schema'
import { PrintForm } from 'src/resources/print-forms/print-form.schema'
import { SampleType } from 'src/resources/sample-types/sample-type.schema'
import { Sample } from 'src/resources/samples/sample.schema'
import { TestCategory } from 'src/resources/test-categories/test-category.schema'
import { TestCombo } from 'src/resources/test-combos/test-combo.schema'
import { TestElement } from 'src/resources/test-elements/test-element.schema'
import { Test } from 'src/resources/tests/test.schema'
import { User } from 'src/resources/users/user.schema'
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
