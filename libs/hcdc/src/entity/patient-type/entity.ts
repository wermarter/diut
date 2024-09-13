import { AssertAllKeysInArray } from '@diut/common'

import { BaseEntity, baseEntityKeys } from '../base-entity'
import { Branch } from '../branch'

export type PatientType = BaseEntity & {
  displayIndex: number
  name: string

  branchId: string
  branch?: Branch | null
}

export enum PatientTypeAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

export const PatientTypeFields = [
  ...baseEntityKeys,
  'displayIndex',
  'name',
  'branchId',
  'branch',
] satisfies (keyof PatientType)[]

true satisfies AssertAllKeysInArray<typeof PatientTypeFields, PatientType>
