import { exampleMongoObjectId } from '@diut/nestjs-core'

import { EntityDataExample } from '../base-entity'
import { Test } from './entity'

export const exampleTest = {
  displayIndex: {
    example: 1,
  },
  name: {
    example: 'tên xét nghiệm',
  },
  shouldDisplayWithChildren: {},
  bioProductId: { ...exampleMongoObjectId, required: false },
  bioProduct: {
    required: false,
    nullable: true,
  },
  instrumentId: { ...exampleMongoObjectId, required: false },
  instrument: {
    required: false,
    nullable: true,
  },
  sampleTypeId: exampleMongoObjectId,
  sampleType: {
    required: false,
    nullable: true,
  },
  testCategoryId: exampleMongoObjectId,
  testCategory: {
    required: false,
    nullable: true,
  },
  printFormId: { ...exampleMongoObjectId, required: false },
  printForm: {
    required: false,
    nullable: true,
  },
  branchId: exampleMongoObjectId,
  branch: {
    required: false,
    nullable: true,
  },
} satisfies EntityDataExample<Test>
