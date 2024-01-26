import { exampleMongoObjectId } from '@diut/nest-core'

import { EntityDataExample } from '../base-entity'
import { TestElement } from './entity'
import { PatientCategory } from '../patient'

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
    example: [
      {
        category: PatientCategory.Any,
        defaultChecked: false,
        normalValue: 'Neg',
        normalLowerBound: 8,
        normalUpperBound: 10,
        description: 'printed to result',
        note: 'note to lab user',
      },
    ],
  },
  testId: exampleMongoObjectId,
  test: {
    required: false,
  },
  branchId: exampleMongoObjectId,
  branch: {
    required: false,
  },
} satisfies EntityDataExample<TestElement>
