import { RecordTypes } from '@casl/mongoose'
import { MongoQuery } from '@casl/ability'

import { BaseEntity } from '../base-entity'

export type Permission = BaseEntity & {
  index: number
  name: string
  description: string
  rule: {
    subject: keyof RecordTypes
    action: string
    inverted?: boolean
    conditions?: MongoQuery
  }
}
