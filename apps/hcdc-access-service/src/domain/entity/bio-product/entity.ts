import { BaseEntity } from '../base-entity'

export type BioProduct = BaseEntity & {
  index: number
  name: string
}
