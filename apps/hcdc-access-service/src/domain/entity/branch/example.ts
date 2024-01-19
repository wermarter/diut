import { exampleMongoObjectIds } from '@diut/nest-core'
import { EntityExample } from '../base-entity'
import { Branch } from './entity'

export const exampleBranch: EntityExample<Branch> = {
  index: {
    example: 1,
    description: 'index',
  },
  name: {
    example: 'HCDC Ba tháng hai',
    description: 'tên chi nhánh',
  },
  address: {
    example: 'Ba tháng hai',
    description: 'địa chỉ chi nhánh',
  },
}
