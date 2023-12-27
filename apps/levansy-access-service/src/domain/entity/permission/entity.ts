import { MongoQuery } from '@casl/ability'

import { BaseEntity } from '../base-entity'
import { AuthSubject } from '../auth'

export type Permission = BaseEntity & {
  index: number
  name: string
  description: string
  rule: {
    subject: AuthSubject
    action: string
    inverted?: boolean
    conditions?: MongoQuery
  }
}
