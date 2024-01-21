import { EntityDataExample } from '../base-entity'
import { TestCategory } from './entity'

export const exampleTestCategory = {
  index: {
    example: 1,
  },
  name: {
    example: 'XN Huyết học - Đông máu',
  },
  reportIndex: {
    example: 1,
  },
} satisfies EntityDataExample<TestCategory>
