import { MongoQuery } from '@casl/ability'

import { BaseEntity } from './base-entity'
import { AuthSubject } from './auth-subject'

export type BasePermissionMapping<
  TSubject extends AuthSubject = AuthSubject,
  TAction extends string = string,
> = {
  subject: TSubject
  actions: TAction[]
}

export type Permission<
  TMapping extends BasePermissionMapping = BasePermissionMapping,
> = BaseEntity & {
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
