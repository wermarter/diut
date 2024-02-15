import { BaseEntity } from '../base-entity'
import { Branch } from '../branch'

export type BioProduct = BaseEntity & {
  displayIndex: number
  name: string

  branchId: string
  branch?: Branch | null
}

export enum BioProductAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}
