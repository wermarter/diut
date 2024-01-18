import { MongoAbility, subject } from '@casl/ability'
import { RecordTypes } from '@casl/mongoose'

import { AuthAction } from './action'
import { SubjectEntityMapping } from './subject'
import { EAuthzPermissionDeny } from 'src/domain/exception'

export function checkPermission<TSubject extends keyof RecordTypes>(
  ability: MongoAbility,
  subjectName: TSubject,
  action: (typeof AuthAction)[TSubject][number],
  object?: Partial<SubjectEntityMapping[TSubject]>,
) {
  if (object != undefined) {
    return ability.can(action, subject(subjectName, object))
  }

  return ability.can(action, subjectName)
}

export function assertPermission<TSubject extends keyof RecordTypes>(
  ability: MongoAbility,
  subjectName: TSubject,
  action: (typeof AuthAction)[TSubject][number],
  object?: Partial<SubjectEntityMapping[TSubject]>,
) {
  if (!checkPermission(ability, subjectName, action, object)) {
    throw new EAuthzPermissionDeny(
      `subject=${subjectName} action=${action} object=${JSON.stringify(
        object,
      )}`,
    )
  }
}
