import { BaseEntity } from '../base-entity'
import { Permission } from '../permission/entity'

export type Role = BaseEntity & {
  index: string
  name: string
  description: string

  permissions: string[] | Permission[]
}
