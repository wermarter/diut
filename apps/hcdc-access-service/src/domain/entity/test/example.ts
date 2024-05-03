import { exampleMongoObjectId, exampleMongoObjectIds } from '@diut/common'
import { Test } from '@diut/hcdc'

import { EntityDataExample } from '../base-entity'

export const exampleTest = {
  displayIndex: {
    example: 1,
  },
  name: {
    example: 'tên xét nghiệm',
  },
  shouldDisplayWithChildren: {},
  bioProductId: { ...exampleMongoObjectId, nullable: true },
  bioProduct: {
    required: false,
    nullable: true,
  },
  instrumentId: { ...exampleMongoObjectId, nullable: true },
  instrument: {
    required: false,
    nullable: true,
  },
  sampleTypeId: { ...exampleMongoObjectId, nullable: true },
  sampleType: {
    required: false,
    nullable: true,
  },
  testCategoryId: exampleMongoObjectId,
  testCategory: {
    required: false,
    nullable: true,
  },
  printFormIds: exampleMongoObjectIds,
  printForms: {
    required: false,
    isArray: true,
  },
  branchId: exampleMongoObjectId,
  branch: {
    required: false,
    nullable: true,
  },
} satisfies EntityDataExample<Test>
