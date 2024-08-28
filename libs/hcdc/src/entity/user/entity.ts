import { BaseEntity } from '../base-entity'
import { Branch } from '../branch'
import { PermissionRule } from '../permission-rule'
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

export enum UserAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
  ChangePassword = 'ChangePassword',
}

export const USER_DEFAULT_PASSWORD = 'password'
