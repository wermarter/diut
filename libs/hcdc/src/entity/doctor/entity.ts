import { AssertAllKeysInArray } from '@diut/common'

import { BaseEntity, baseEntityKeys } from '../base-entity'
import { Branch } from '../branch'

export type Doctor = BaseEntity & {
  displayIndex: number
  name: string

  branchId: string
  branch?: Branch | null
}

export enum DoctorAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

export const DoctorFields = [
  ...baseEntityKeys,
  'displayIndex',
  'name',
  'branchId',
  'branch',
] satisfies (keyof Doctor)[]

true satisfies AssertAllKeysInArray<typeof DoctorFields, Doctor>
