import { AssertAllKeysInArray } from '@diut/common'
import { BaseEntity, baseEntityKeys } from '../base-entity'
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
  branches?: Branch[]

  roleIds: string[]
  roles?: Role[]
}

export enum UserAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
  ChangePassword = 'ChangePassword',
}

export const USER_DEFAULT_PASSWORD = 'password'

export const UserFields = [
  ...baseEntityKeys,
  'username',
  'passwordHash',
  'name',
  'phoneNumber',
  'inlinePermissions',
  'branchIds',
  'branches',
  'roleIds',
  'roles',
] satisfies (keyof User)[]

true satisfies AssertAllKeysInArray<typeof UserFields, User>
