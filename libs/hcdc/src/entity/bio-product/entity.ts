import { AssertAllKeysInArray } from '@diut/common'

import { BaseEntity, baseEntityKeys } from '../base-entity'
import { Branch } from '../branch'
import { Test } from '../test'

export type BioProduct = BaseEntity & {
  displayIndex: number
  name: string

  testId: string
  test?: Test | null

  branchId: string
  branch?: Branch | null
}

export enum BioProductAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

export const BioProductFields = [
  ...baseEntityKeys,
  'displayIndex',
  'name',
  'testId',
  'test',
  'branchId',
  'branch',
] satisfies (keyof BioProduct)[]

true satisfies AssertAllKeysInArray<typeof BioProductFields, BioProduct>
