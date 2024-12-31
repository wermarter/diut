import { AssertAllKeysInArray } from '@diut/common'
import { BaseEntity, baseEntityKeys } from '../base-entity'
import { Branch } from '../branch'
import { Test } from '../test/entity'

export type TestCombo = BaseEntity & {
  displayIndex: number
  name: string

  testIds: string[]
  tests?: Test[]

  branchId: string
  branch?: Branch
}

export enum TestComboAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

export const TestComboFields = [
  ...baseEntityKeys,
  'displayIndex',
  'name',
  'testIds',
  'tests',
  'branchId',
  'branch',
] satisfies (keyof TestCombo)[]

true satisfies AssertAllKeysInArray<typeof TestComboFields, TestCombo>
