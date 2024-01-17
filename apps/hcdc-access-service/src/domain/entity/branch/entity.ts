import { BaseEntity } from '../base-entity'

export type Branch = BaseEntity & {
  index: number
  name: string

  address: string
}
