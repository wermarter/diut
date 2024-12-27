import { StringOrKeysOf } from '@diut/common'
import {
  AUTH_ACTION_ALL,
  AUTH_SUBJECT_ALL,
  AuthAction,
  AuthSubject,
  MongoQuery,
  SubjectEntityMapping,
} from '../../auth'

type ManagedSubject = keyof typeof AuthSubject
type AllSubject = ManagedSubject | typeof AUTH_SUBJECT_ALL

export type PermissionRule<TSubject extends AllSubject = AllSubject> = {
  subject: TSubject
  action: TSubject extends ManagedSubject
    ? (typeof AuthAction)[TSubject][number] | typeof AUTH_ACTION_ALL
    : typeof AUTH_ACTION_ALL
  inverted?: boolean
  conditions?: TSubject extends ManagedSubject
    ?
        | MongoQuery<SubjectEntityMapping[TSubject]>
        | SubjectEntityMapping[TSubject]
    : never
  fields?: TSubject extends ManagedSubject
    ? StringOrKeysOf<SubjectEntityMapping[TSubject]>[]
    : never
}
