import { AssertAllKeysInArray } from '@diut/common'
import { BaseEntity, baseEntityKeys } from '../base-entity'
import { Branch } from '../branch'

export type SampleType = BaseEntity & {
  displayIndex: number
  name: string

  branchId: string
  branch?: Branch
}

export enum SampleTypeAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

export const SampleTypeFields = [
  ...baseEntityKeys,
  'displayIndex',
  'name',
  'branchId',
  'branch',
] satisfies (keyof SampleType)[]

true satisfies AssertAllKeysInArray<typeof SampleTypeFields, SampleType>
