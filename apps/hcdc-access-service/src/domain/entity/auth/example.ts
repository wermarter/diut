import { exampleMongoObjectId } from '@diut/nest-core'

import { EntityDataExample } from '../base-entity'
import { AuthActionValues } from './action'
import { PermissionRule } from './entity'
import { AuthSubjectValues } from './subject'

export const examplePermissionRule = {
  subject: {
    example: AuthSubjectValues[0],
    enum: AuthSubjectValues,
  },
  action: {
    example: AuthActionValues[0],
    enum: AuthActionValues,
  },
  inverted: {
    example: false,
    default: false,
    required: false,
  },
  conditions: {
    example: { _id: { $eq: exampleMongoObjectId.example } },
  },
} satisfies EntityDataExample<PermissionRule>
