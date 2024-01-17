import { exampleMongoObjectId } from '@diut/nest-core'

import { EntityExample } from '../base-entity'
import { User } from './entity'

export const exampleUser: EntityExample<User> = {
  username: {
    example: 'levana',
    description: 'username',
  },
  name: {
    example: 'Lê Văn A',
    description: 'name',
  },
  phoneNumber: {
    example: '1234567890',
    description: 'phoneNumber',
  },
  password: {
    example: 'hashed_password',
    description: 'password',
  },
  branchId: exampleMongoObjectId,
}
