import { exampleMongoObjectId, exampleMongoObjectIds } from '@diut/nest-core'

import { EntityDataExample } from '../base-entity'
import { TestCombo } from './entity'

export const exampleTestCombo = {
  displayIndex: {
    example: 1,
  },
  name: {
    example: 'combo sinh hóa',
  },
  testIds: exampleMongoObjectIds,
  tests: {
    required: false,
    isArray: true,
  },
  branchId: exampleMongoObjectId,
  branch: {
    required: false,
  },
} satisfies EntityDataExample<TestCombo>