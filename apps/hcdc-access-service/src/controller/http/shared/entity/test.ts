import { exampleMongoObjectId, exampleMongoObjectIds } from '@diut/common'
import { Test } from '@diut/hcdc'
import { EntityDataExample } from './base-entity'

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
  },
  instrumentId: { ...exampleMongoObjectId, nullable: true },
  instrument: {
    required: false,
  },
  sampleTypeId: { ...exampleMongoObjectId, nullable: true },
  sampleType: {
    required: false,
  },
  testCategoryId: exampleMongoObjectId,
  testCategory: {
    required: false,
  },
  printFormIds: exampleMongoObjectIds,
  printForms: {
    required: false,
  },
  branchId: exampleMongoObjectId,
  branch: {
    required: false,
  },
} satisfies EntityDataExample<Test>
