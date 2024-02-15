import { BaseEntity } from '../base-entity'
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
