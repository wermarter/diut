import { exampleMongoObjectId } from '@diut/nestjs-core'

import { EntityDataExample } from '../base-entity'
import { TestCategory } from './entity'

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
