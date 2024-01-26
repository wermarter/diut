import { BaseEntity } from '../base-entity'
import { Branch } from '../branch'

export type Test = BaseEntity & {
  displayIndex: number
  name: string
  shouldNotPrint: boolean
  shouldDisplayWithChildren: boolean

  branchId: string
  branch?: Branch | null
}
