import { exampleMongoObjectIds } from '@diut/nestjs-infra'

import { EntityDataExample } from '../base-entity'
import { Branch, BranchType } from './entity'

export const exampleBranch = {
  displayIndex: {
    example: 1,
  },
  name: {
    example: 'HCDC Ba tháng hai',
  },
  address: {
    example: 'đường 3/2',
  },
  type: {
    enum: BranchType,
  },
  sampleOriginIds: exampleMongoObjectIds,
  sampleOrigins: {
    required: false,
    isArray: true,
  },
} satisfies EntityDataExample<Branch>
