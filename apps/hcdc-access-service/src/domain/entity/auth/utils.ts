import { MongoAbility, subject as assignSubject } from '@casl/ability'

import { AuthAction } from './action'
import { AuthSubject, SubjectEntityMapping } from './subject'
import { EAuthzPermissionDenied } from 'src/domain/exception'

export function checkPermission<TSubject extends keyof typeof AuthSubject>(
  ability: MongoAbility,
  subject: TSubject,
  action: (typeof AuthAction)[TSubject][number],
  object?: Partial<SubjectEntityMapping[TSubject]>,
) {
  if (object != undefined) {
    return ability.can(action, assignSubject(subject, object))
  }

  return ability.can(action, subject)
}

export function assertPermission<TSubject extends keyof typeof AuthSubject>(
  ability: MongoAbility,
  subject: TSubject,
  action: (typeof AuthAction)[TSubject][number],
  object?: Partial<SubjectEntityMapping[TSubject]>,
) {
  if (!checkPermission(ability, subject, action, object)) {
    throw new EAuthzPermissionDenied(
      `${action} -> ${object != undefined ? 'this' : 'any'} ${subject}`,
    )
  }
}
