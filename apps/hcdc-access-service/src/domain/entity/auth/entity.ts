import { MongoQuery } from '@casl/ability'

import { AuthSubject, SubjectEntityMapping } from './subject'
import { AuthAction } from './action'

export type PermissionRule<
  TSubject extends keyof typeof AuthSubject = keyof typeof AuthSubject,
> = {
  subject: TSubject
  action: (typeof AuthAction)[TSubject][number]
  inverted?: boolean
  conditions?: MongoQuery<SubjectEntityMapping[TSubject]>
}
