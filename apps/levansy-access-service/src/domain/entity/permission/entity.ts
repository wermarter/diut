import { MongoQuery } from '@casl/ability'

import { BaseEntity } from '../base-entity'
import { EntityPermission } from './mapping'

export type Permission<TMapping extends EntityPermission = EntityPermission> =
  BaseEntity & {
    index: number
    name: string
    description: string
    rule: {
      subject: TMapping['subject']
      action: TMapping['actions'][number]
      inverted?: boolean
      conditions?: MongoQuery<TMapping['subject']>
    }
  }
