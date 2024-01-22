import { BaseEntity } from '../base-entity'
import { Branch } from '../branch'
import { PermissionRule } from '../permission-rule'

export type Role = BaseEntity & {
  index: number
  name: string

  description: string

  permissions: PermissionRule[]

  branchIds: string[]
  branches?: (Branch | null)[]
}
