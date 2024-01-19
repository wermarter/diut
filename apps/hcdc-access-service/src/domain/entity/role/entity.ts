import { RecordTypes } from '@casl/mongoose'
import { MongoQuery, RawRule } from '@casl/ability'

import { BaseEntity } from '../base-entity'

export type Role = BaseEntity & {
  index: string
  name: string

  description: string

  policy: {
    subject: keyof RecordTypes
    action: string
    inverted?: boolean
    conditions?: MongoQuery
  }
}
