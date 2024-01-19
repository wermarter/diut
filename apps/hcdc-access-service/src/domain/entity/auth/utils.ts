import { MongoAbility, subject as assignSubject } from '@casl/ability'
import { RecordTypes } from '@casl/mongoose'
import { Logger } from '@nestjs/common'

import { AuthAction } from './action'
import { SubjectEntityMapping } from './subject'
import { EAuthzPermissionDenied } from 'src/domain/exception'

const logger = new Logger('AuthUtil')

export function checkPermission<TSubject extends keyof RecordTypes>(
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

export function assertPermission<TSubject extends keyof RecordTypes>(
  ability: MongoAbility,
  subject: TSubject,
  action: (typeof AuthAction)[TSubject][number],
  object?: Partial<SubjectEntityMapping[TSubject]>,
) {
  if (!checkPermission(ability, subject, action, object)) {
    logger.warn(
      `assertPermission failed:\n ${JSON.stringify(
        {
          ability,
          subject,
          action,
          object,
        },
        null,
        2,
      )}`,
    )

    throw new EAuthzPermissionDenied(`${action} -> ${subject}`)
  }
}
