import { BaseEntity } from '../base-entity'
import { Branch } from '../branch'
// import { Permission } from './permission'
// import { Role } from './role'

export type User = BaseEntity & {
  username: string
  password: string
  name: string
  phoneNumber: string

  branchId: string
  branch?: Branch | null

  // roles: string[] | Role[]
  // inlinePermissions: string[] | Permission[]
}
