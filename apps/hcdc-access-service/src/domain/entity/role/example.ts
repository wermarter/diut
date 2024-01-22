import { exampleMongoObjectIds } from '@diut/nest-core'

import { EntityDataExample } from '../base-entity'
import { Role } from './entity'

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
  permissions: {
    isArray: true,
  },
  branchIds: exampleMongoObjectIds,
  branches: {
    required: false,
    isArray: true,
  },
} satisfies EntityDataExample<Role>
