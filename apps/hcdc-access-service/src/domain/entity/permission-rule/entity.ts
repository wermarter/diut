import { MongoQuery } from '@casl/ability'

import { AuthSubject, SubjectEntityMapping } from '../auth/subject'
import { AuthAction } from '../auth/action'

export type PermissionRule<
  TSubject extends keyof typeof AuthSubject = keyof typeof AuthSubject,
> = {
  subject: TSubject
  action: (typeof AuthAction)[TSubject][number]
  inverted?: boolean
  conditions?: MongoQuery<SubjectEntityMapping[TSubject]>
}
