import { BaseEntity } from './base-entity'

export type BioProduct = BaseEntity & {
  name: string
  index: number
}
