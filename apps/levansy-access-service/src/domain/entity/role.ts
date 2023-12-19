import { BaseEntity } from './base-entity'
import { Permission } from './permission'

export type Role = BaseEntity & {
  index: string
  name: string
  description: string

  permissions: string[] | Permission[]
}
