import { exampleMongoObjectIds } from '@diut/nest-core'

import { EntityExample } from '../base-entity'
import { Role } from './entity'

export const exampleRole: EntityExample<Role> = {
  index: {
    example: 1,
    description: 'index',
  },
  name: {
    example: 'Admin',
    description: 'tên phân quyền',
  },
  description: {
    example: 'phân quyền cao nhất',
    description: 'mô tả',
  },
  policy: {
    example: [],
    description: 'policy',
  },
  branchIds: exampleMongoObjectIds,
  branches: {
    example: [],
    description: 'các chi nhánh khả dụng cho phân quyền này',
  },
}
