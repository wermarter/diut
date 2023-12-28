import { MongoAbility } from '@casl/ability'
import { RecordTypes } from '@casl/mongoose'

import { AuthAction } from './action'
import { AuthSubject, AuthSubjectType } from './subject'
import { EAuthzPermissionDeny } from 'src/domain/exception'

export function checkPermission<TSubject extends keyof RecordTypes>(
  ability: MongoAbility,
  subjectType: TSubject,
  action: (typeof AuthAction)[TSubject][number],
  object?: AuthSubjectType[TSubject],
) {
  const subject = AuthSubject[subjectType]
  // object type injection
  return ability.can(action, subject)
}

export function assertPermission<TSubject extends keyof RecordTypes>(
  ability: MongoAbility,
  subjectType: TSubject,
  action: (typeof AuthAction)[TSubject][number],
  object?: AuthSubjectType[TSubject],
) {
  if (!checkPermission(ability, subjectType, action, object)) {
    throw new EAuthzPermissionDeny(
      `subject=${AuthSubject[subjectType]} action=${action} object=${object}`,
    )
  }
}
