import { stringEnumValues } from '@diut/common'

import { BaseEntity } from '../base-entity'

export enum BranchType {
  Internal = 'Internal',
  External = 'External',
}

export const BranchTypeValues = stringEnumValues(BranchType)

export type Branch = BaseEntity & {
  index: number
  name: string

  address: string

  type: BranchType
}
