import { exampleMongoObjectId } from '@diut/common'
import { PatientCategory, TestElement } from '@diut/hcdc'
import { EntityDataExample } from './base-entity'

export const exampleNormalRule = {
  category: {
    enum: PatientCategory,
  },
  defaultChecked: {
    required: false,
  },
  normalValue: {
    required: false,
    example: 'Neg',
  },
  normalUpperBound: {
    required: false,
    example: 10,
  },
  normalLowerBound: {
    required: false,
    example: 8,
  },
  description: {
    example: 'printed to result',
  },
  note: {
    example: 'note to lab user',
  },
} satisfies EntityDataExample<TestElement['normalRules'][number]>

export const exampleTestElement = {
  displayIndex: {
    example: 1,
  },
  name: {
    example: 'tên thành phần XN',
  },
  printIndex: {
    example: 1,
  },
  reportIndex: {
    example: 1,
  },
  unit: {
    example: '10^3/uL',
  },
  isParent: {},
  normalRules: {
    isArray: true,
  },
  testId: exampleMongoObjectId,
  test: {
    required: false,
    nullable: true,
  },
  branchId: exampleMongoObjectId,
  branch: {
    required: false,
  },
} satisfies EntityDataExample<TestElement>
