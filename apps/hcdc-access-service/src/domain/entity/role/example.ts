import { exampleMongoObjectIds } from '@diut/nest-core'

import { EntityDataExample, extractExampleEntity } from '../base-entity'
import { Role } from './entity'
import { examplePermissionRule } from '../auth'
import { exampleBranch } from '../branch'

export const exampleRole = {
  index: {
    example: 1,
  },
  name: {
    example: 'Admin',
  },
  description: {
    example: 'phân quyền cao nhất',
  },
  policy: {
    example: [extractExampleEntity(examplePermissionRule, false)],
  },
  branchIds: exampleMongoObjectIds,
  branches: {
    example: [extractExampleEntity(exampleBranch)],
    required: false,
  },
} satisfies EntityDataExample<Role>
