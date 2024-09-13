import { AuthActionValues, AuthSubjectValues, PermissionRule } from '@diut/hcdc'

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
  fields: {
    isArray: true,
    example: [],
    required: false,
  },
} satisfies EntityDataExample<PermissionRule>
