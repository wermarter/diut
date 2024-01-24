import { exampleMongoObjectId } from '@diut/nest-core'

import { EntityDataExample } from '../base-entity'
import { Role } from './entity'

export const exampleRole = {
  displayIndex: {
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
  branchId: exampleMongoObjectId,
  branch: {
    required: false,
  },
} satisfies EntityDataExample<Role>
