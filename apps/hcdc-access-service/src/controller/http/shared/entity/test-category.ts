import { exampleMongoObjectId } from '@diut/common'
import { TestCategory } from '@diut/hcdc'
import { EntityDataExample } from './base-entity'

export const exampleTestCategory = {
  displayIndex: {
    example: 1,
  },
  name: {
    example: 'XN Huyết học - Đông máu',
  },
  reportIndex: {
    example: 1,
  },
  branchId: exampleMongoObjectId,
  branch: {
    required: false,
    nullable: true,
  },
} satisfies EntityDataExample<TestCategory>
