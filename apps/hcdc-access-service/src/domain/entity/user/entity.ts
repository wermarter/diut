import { BaseEntity } from '../base-entity'
// import { Permission } from './permission'
// import { Role } from './role'

export type User = BaseEntity & {
  username: string
  password: string
  name: string
  phoneNumber?: string
  // roles: string[] | Role[]
  // inlinePermissions: string[] | Permission[]
}
