import { BaseEntity } from '../base-entity'
import { Branch } from '../branch'
import { PermissionRule } from '../permission-rule'

export type Role = BaseEntity & {
  displayIndex: number
  name: string
  description: string
  permissions: PermissionRule[]

  branchId: string
  branch?: Branch | null
}

export enum RoleAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
  AssignToUser = 'AssignToUser',
  AssignUserInline = 'AssignUserInline',
}
