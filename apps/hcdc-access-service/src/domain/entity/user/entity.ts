import { BaseEntity } from '../base-entity'
import { Branch } from '../branch'
// import { Permission } from './permission'
// import { Role } from './role'

export type User = BaseEntity & {
  username: string
  passwordHash: string

  name: string
  phoneNumber: string

  branchIds: string[]
  branches?: (Branch | null)[]

  // roles: string[] | Role[]
  // inlinePermissions: string[] | Permission[]
}
