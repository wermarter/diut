import { BaseEntity } from '../base-entity'
import { Branch } from '../branch'

export type SampleType = BaseEntity & {
  displayIndex: number
  name: string

  branchId: string
  branch?: Branch | null
}

export enum SampleTypeAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}
