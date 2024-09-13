import { AssertAllKeysInArray, stringEnumValues } from '@diut/common'

import { BaseEntity, baseEntityKeys } from '../base-entity'
import { ReportType } from '../report'

export enum BranchType {
  Internal = 'Internal',
  External = 'External',
}

export const BranchTypeValues = stringEnumValues(BranchType)

export type BranchReportConfig = Partial<
  Record<
    ReportType,
    {
      testIds: string[]
    }
  >
>

export type Branch = BaseEntity & {
  displayIndex: number
  name: string
  address: string
  type: BranchType
  reportConfig: BranchReportConfig

  sampleOriginIds: string[]
  sampleOrigins?: (Omit<Branch, 'sampleOrigins'> | null)[]
}

export enum BranchAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
  AuthorizeUser = 'AuthorizeUser',
  DeauthorizeUser = 'DeauthorizeUser',
}

export const BranchFields = [
  ...baseEntityKeys,
  'displayIndex',
  'name',
  'address',
  'type',
  'reportConfig',
  'sampleOriginIds',
  'sampleOrigins',
] satisfies (keyof Branch)[]

true satisfies AssertAllKeysInArray<typeof BranchFields, Branch>
