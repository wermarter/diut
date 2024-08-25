import { PermissionRule, AuthActionValues, AuthSubjectValues } from '@diut/hcdc'

import { EntityDataExample } from './base-entity'

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
