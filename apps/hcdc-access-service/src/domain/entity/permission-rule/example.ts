import { EntityDataExample } from '../base-entity'
import { AuthActionValues } from '../auth/action'
import { PermissionRule } from './entity'
import { AuthSubjectValues } from '../auth/subject'

export const examplePermissionRule = {
  subject: {
    enum: AuthSubjectValues,
  },
  action: {
    enum: AuthActionValues,
  },
  inverted: {
    example: false,
    required: false,
  },
  conditions: {
    example: {},
  },
} satisfies EntityDataExample<PermissionRule>
