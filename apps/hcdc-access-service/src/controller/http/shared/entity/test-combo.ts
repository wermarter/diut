import { exampleMongoObjectId, exampleMongoObjectIds } from '@diut/common'
import { TestCombo } from '@diut/hcdc'
import { EntityDataExample } from './base-entity'

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
    nullable: true,
  },
} satisfies EntityDataExample<TestCombo>
