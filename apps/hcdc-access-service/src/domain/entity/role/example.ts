import { exampleMongoObjectId } from '@diut/common'
import { Role } from '@diut/hcdc'

import { EntityDataExample } from '../base-entity'

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
    nullable: true,
  },
} satisfies EntityDataExample<Role>
