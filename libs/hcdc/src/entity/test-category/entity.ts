import { AssertAllKeysInArray } from '@diut/common'
import { BaseEntity, baseEntityKeys } from '../base-entity'
import { Branch } from '../branch'

export type TestCategory = BaseEntity & {
  displayIndex: number
  name: string
  reportIndex: number

  branchId: string
  branch?: Branch
}

export enum TestCategoryAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

export const TestCategoryFields = [
  ...baseEntityKeys,
  'displayIndex',
  'name',
  'reportIndex',
  'branchId',
  'branch',
] satisfies (keyof TestCategory)[]

true satisfies AssertAllKeysInArray<typeof TestCategoryFields, TestCategory>
