import { EntityDataExample } from '../base-entity'
import { Branch, BranchType } from './entity'

export const exampleBranch = {
  index: {
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
} satisfies EntityDataExample<Branch>
