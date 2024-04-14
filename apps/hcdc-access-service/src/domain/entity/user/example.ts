import { exampleMongoObjectIds } from '@diut/common'
import { User } from '@diut/hcdc'

import { EntityDataExample } from '../base-entity'

export const exampleUser = {
  username: {
    example: 'levana',
  },
  passwordHash: {
    example: 'hashed_password',
  },
  name: {
    example: 'Lê Văn A',
  },
  phoneNumber: {
    example: '1234567890',
  },
  inlinePermissions: {
    isArray: true,
  },
  branchIds: exampleMongoObjectIds,
  branches: {
    required: false,
    isArray: true,
  },
  roleIds: exampleMongoObjectIds,
  roles: {
    required: false,
    isArray: true,
  },
} satisfies EntityDataExample<User>
