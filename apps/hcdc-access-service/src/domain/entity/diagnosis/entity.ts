import { BaseEntity } from '../base-entity'
import { Branch } from '../branch'

export type Diagnosis = BaseEntity & {
  displayIndex: number
  name: string

  branchId: string
  branch?: Branch | null
}
