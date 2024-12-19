import { AssertAllKeysInArray } from '@diut/common'
import { BaseEntity, baseEntityKeys } from '../base-entity'
import { Branch } from '../branch'
import { Test } from '../test'

export type Instrument = BaseEntity & {
  displayIndex: number
  name: string

  testId: string
  test?: Test | null

  branchId: string
  branch?: Branch | null
}

export enum InstrumentAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

export const InstrumentFields = [
  ...baseEntityKeys,
  'displayIndex',
  'name',
  'testId',
  'test',
  'branchId',
  'branch',
] satisfies (keyof Instrument)[]

true satisfies AssertAllKeysInArray<typeof InstrumentFields, Instrument>
