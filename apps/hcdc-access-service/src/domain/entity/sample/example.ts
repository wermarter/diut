import {
  exampleDate,
  exampleMongoObjectId,
  exampleMongoObjectIds,
} from '@diut/nestjs-core'

import { EntityDataExample } from '../base-entity'
import { SampleResultTestElement, SampleResultTest, Sample } from './entity'
import { exampleBioProduct } from '../bio-product'
import { exampleInstrument } from '../instrument'

export const exampleTestElementResult = {
  testElementId: exampleMongoObjectId,
  testElement: {
    required: false,
    nullable: true,
  },
  value: {
    example: 'Neg',
  },
  isAbnormal: {},
} satisfies EntityDataExample<SampleResultTestElement>

export const exampleTestResult = {
  testId: exampleMongoObjectId,
  test: {
    required: false,
    nullable: true,
  },
  isLocked: {},
  resultById: {
    ...exampleMongoObjectId,
    required: false,
  },
  resultBy: {
    required: false,
    nullable: true,
  },
  resultAt: { ...exampleDate, required: false },
  bioProductName: { required: false, example: exampleBioProduct.name.example },
  instrumentName: { required: false, example: exampleInstrument.name.example },
  elements: {
    isArray: true,
  },
} satisfies EntityDataExample<SampleResultTest>

export const exampleSample = {
  sampleId: {
    example: '2232010819',
  },
  note: {
    example: 'ghi chú nho nhỏ...',
  },
  isNgoaiGio: {},
  isTraBuuDien: {},
  isConfirmed: {},
  infoAt: exampleDate,
  sampledAt: exampleDate,
  printedAt: { ...exampleDate, required: false },
  sampleCompleted: {},
  results: {
    isArray: true,
  },
  infoById: exampleMongoObjectId,
  infoBy: {
    required: false,
    nullable: true,
  },
  printedById: { ...exampleMongoObjectId, required: false },
  printedBy: {
    required: false,
    nullable: true,
  },
  patientId: exampleMongoObjectId,
  patient: {
    required: false,
    nullable: true,
  },
  doctorId: exampleMongoObjectId,
  doctor: {
    required: false,
    nullable: true,
  },
  patientTypeId: exampleMongoObjectId,
  patientType: {
    required: false,
    nullable: true,
  },
  diagnosisId: exampleMongoObjectId,
  diagnosis: {
    required: false,
    nullable: true,
  },
  originId: exampleMongoObjectId,
  origin: {
    required: false,
    nullable: true,
  },
  sampleTypeIds: exampleMongoObjectIds,
  sampleTypes: {
    required: false,
    isArray: true,
  },
  branchId: exampleMongoObjectId,
  branch: {
    required: false,
    nullable: true,
  },
} satisfies EntityDataExample<Sample>
