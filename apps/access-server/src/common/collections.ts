import { PropOptions } from '@nestjs/mongoose'
import { Schema } from 'mongoose'

export enum COLLECTION {
  BOOK = 'books',
  USER = 'users',
  PATIENT = 'patients',
  DOCTOR = 'doctors',
  TEST_CATEGORY = 'test_categories',
  TEST = 'tests',
  TEST_ELEMENT = 'test_elements',
  PATIENT_TYPE = 'patient_types',
  SAMPLE = 'samples',
  TEST_RESULT = 'test_results',
  TEST_ELEMENT_RESULT = 'test_element_results',
}

export const DB_REF = Object.keys(COLLECTION).reduce((result, resourceName) => {
  result[resourceName] = <PropOptions>{
    index: true,
    type: Schema.Types.ObjectId,
    ref: COLLECTION[resourceName],
  }

  return result
}, {} as { [name in keyof typeof COLLECTION]: PropOptions })
