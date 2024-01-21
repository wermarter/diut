import { exampleMongoObjectIds } from '@diut/nest-core'

import { EntityDataExample, extractExampleEntity } from '../base-entity'
import { User } from './entity'
import { exampleBranch } from '../branch'

export const exampleUser = {
  username: {
    example: 'levana',
  },
  name: {
    example: 'Lê Văn A',
  },
  phoneNumber: {
    example: '1234567890',
  },
  passwordHash: {
    example: 'hashed_password',
  },
  branchIds: exampleMongoObjectIds,
  branches: {
    example: [extractExampleEntity(exampleBranch)],
    isArray: true,
  },
} satisfies EntityDataExample<User>
