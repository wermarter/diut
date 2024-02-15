import { exampleMongoObjectIds } from '@diut/common'
import { Branch, BranchType } from '@diut/hcdc'

import { EntityDataExample } from '../base-entity'

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
