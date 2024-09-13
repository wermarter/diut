import { AssertAllKeysInArray } from '@diut/common'

import { BaseEntity, baseEntityKeys } from '../base-entity'
import { Branch } from '../branch'

export type Diagnosis = BaseEntity & {
  displayIndex: number
  name: string

  branchId: string
  branch?: Branch | null
}

export enum DiagnosisAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

export const DiagnosisFields = [
  ...baseEntityKeys,
  'displayIndex',
  'name',
  'branchId',
  'branch',
] satisfies (keyof Diagnosis)[]

true satisfies AssertAllKeysInArray<typeof DiagnosisFields, Diagnosis>
