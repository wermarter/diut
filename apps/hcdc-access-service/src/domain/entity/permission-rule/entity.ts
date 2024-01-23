import { MongoQuery } from '@casl/ability'

import { AuthAction, AuthSubject, SubjectEntityMapping } from 'src/domain/auth'

export type PermissionRule<
  TSubject extends keyof typeof AuthSubject = keyof typeof AuthSubject,
> = {
  subject: TSubject
  action: (typeof AuthAction)[TSubject][number]
  inverted?: boolean
  conditions?: MongoQuery<SubjectEntityMapping[TSubject]>
}
