import { BaseEntity } from '../base-entity'
import { Branch } from '../branch'
import { PermissionRule } from '../auth'

export type Role = BaseEntity & {
  index: number
  name: string

  description: string

  policy: PermissionRule[]

  branchIds: string[]
  branches?: (Branch | null)[]
}
