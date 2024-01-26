import { BaseEntity } from '../base-entity'

export enum BranchType {
  Internal = 'Internal',
  External = 'External',
}

export type Branch = BaseEntity & {
  displayIndex: number
  name: string
  address: string
  type: BranchType

  sampleOriginIds: string[]
  sampleOrigins?: (Omit<Branch, 'sampleOrigins'> | null)[]
}
