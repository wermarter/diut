import { BaseEntity } from '../base-entity'
import { Branch } from '../branch'

export type TestCategory = BaseEntity & {
  displayIndex: number
  name: string
  reportIndex: number

  branchId: string
  branch?: Branch | null
}

export enum TestCategoryAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}
