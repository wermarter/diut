import { MongoQuery } from '@casl/ability'
import { StringOrKeysOf } from '@diut/common'
import {
  AUTH_ACTION_ALL,
  AUTH_SUBJECT_ALL,
  AuthAction,
  AuthSubject,
  SubjectEntityMapping,
} from '../../auth'

export type PermissionRule<
  TSubject extends keyof typeof AuthSubject = keyof typeof AuthSubject,
> = {
  subject: TSubject | typeof AUTH_SUBJECT_ALL
  action: (typeof AuthAction)[TSubject][number] | typeof AUTH_ACTION_ALL
  inverted?: boolean
  conditions?: MongoQuery<SubjectEntityMapping[TSubject]>
  fields?: StringOrKeysOf<SubjectEntityMapping[TSubject]>[]
}
