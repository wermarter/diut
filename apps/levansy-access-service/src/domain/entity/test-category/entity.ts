import { BaseEntity } from '../base-entity'

export type TestCategory = BaseEntity & {
  index: number
  name: string
  reportIndex: number
}
