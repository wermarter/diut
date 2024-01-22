import { PermissionRule } from '../permission-rule'
import { BaseEntity } from '../base-entity'
import { Branch } from '../branch'
import { Role } from '../role'

export type User = BaseEntity & {
  username: string
  passwordHash: string

  name: string
  phoneNumber: string

  inlinePermissions: PermissionRule[]

  branchIds: string[]
  branches?: (Branch | null)[]

  roleIds: string[]
  roles?: (Role | null)[]
}
