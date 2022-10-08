import { Schema } from 'mongoose'

export enum COLLECTION {
  BOOK = 'books',
  USER = 'users',
  PATIENT = 'patients',
  DOCTOR = 'doctor',
  TEST_CATEGORY = 'test_categories',
  TEST = 'tests',
  TEST_ELEMENT = 'test_elements',
  PATIENT_TYPE = 'patient_types',
  SAMPLE = 'samples',
  TEST_RESULT = 'test_results',
  TEST_ELEMENT_RESULT = 'test_element_results',
}

export const DB_REF = {
  BOOK: {
    type: Schema.Types.ObjectId,
    ref: COLLECTION.BOOK,
  },
  USER: {
    type: Schema.Types.ObjectId,
    ref: COLLECTION.USER,
  },
  PATIENT: {
    type: Schema.Types.ObjectId,
    ref: COLLECTION.PATIENT,
  },
  DOCTOR: {
    type: Schema.Types.ObjectId,
    ref: COLLECTION.DOCTOR,
  },
  TEST_CATEGORY: {
    type: Schema.Types.ObjectId,
    ref: COLLECTION.TEST_CATEGORY,
  },
  TEST: {
    type: Schema.Types.ObjectId,
    ref: COLLECTION.TEST,
  },
  TEST_ELEMENT: {
    type: Schema.Types.ObjectId,
    ref: COLLECTION.TEST_ELEMENT,
  },
  PATIENT_TYPE: {
    type: Schema.Types.ObjectId,
    ref: COLLECTION.PATIENT_TYPE,
  },
  SAMPLE: {
    type: Schema.Types.ObjectId,
    ref: COLLECTION.SAMPLE,
  },
  TEST_RESULT: {
    type: Schema.Types.ObjectId,
    ref: COLLECTION.TEST_RESULT,
  },
  TEST_ELEMENT_RESULT: {
    type: Schema.Types.ObjectId,
    ref: COLLECTION.TEST_ELEMENT_RESULT,
  },
}
