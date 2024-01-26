import { exampleMongoObjectId } from '@diut/nest-core'

import { EntityDataExample } from '../base-entity'
import { Test } from './entity'

export const exampleTest = {
  displayIndex: {
    example: 1,
  },
  name: {
    example: 'tên xét nghiệm',
  },
  shouldNotPrint: {},
  shouldDisplayWithChildren: {},
  bioProductId: exampleMongoObjectId,
  bioProduct: {
    required: false,
  },
  instrumentId: exampleMongoObjectId,
  instrument: {
    required: false,
  },
  sampleTypeId: exampleMongoObjectId,
  sampleType: {
    required: false,
  },
  testCategoryId: exampleMongoObjectId,
  testCategory: {
    required: false,
  },
  printFormId: exampleMongoObjectId,
  printForm: {
    required: false,
  },
  branchId: exampleMongoObjectId,
  branch: {
    required: false,
  },
} satisfies EntityDataExample<Test>
