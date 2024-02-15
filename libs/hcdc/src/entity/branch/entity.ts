import { stringEnumValues } from '@diut/common'

import { BaseEntity } from '../base-entity'

export enum BranchType {
  Internal = 'Internal',
  External = 'External',
}

export const BranchTypeValues = stringEnumValues(BranchType)

export type Branch = BaseEntity & {
  displayIndex: number
  name: string
  address: string
  type: BranchType

  sampleOriginIds: string[]
  sampleOrigins?: (Omit<Branch, 'sampleOrigins'> | null)[]
}

export enum BranchAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}
