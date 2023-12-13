import { BaseEntity, EntityExample } from './base-entity'

export type TestCategory = BaseEntity & {
  index: number
  name: string
  reportIndex: number
}

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
