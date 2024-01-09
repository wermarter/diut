import { EntityExample } from '../base-entity'
import { TestCategory } from './entity'

export const exampleTestCategory: EntityExample<TestCategory> = {
  index: {
    example: 1,
    description: 'thứ tự in trong kết quả',
  },
  name: {
    example: 'XN Huyết học - Đông máu',
    description: 'name',
  },
  reportIndex: {
    example: 1,
    description: 'thứ tự in trong báo cáo',
  },
}
