import {
  MongoAbility,
  subject as assignSubject,
  buildMongoQueryMatcher,
  createMongoAbility,
} from '@casl/ability'
import { $or, or } from '@ucast/mongo2js'

import { AuthAction, AuthActionUnionType } from './action'
import {
  AuthSubject,
  AuthSubjectUnionType,
  SubjectEntityMapping,
} from './subject'
import { AUTH_ACTION_ALL, AUTH_SUBJECT_ALL } from './constants'
import { PermissionRule } from '../entity'

const conditionsMatcher = buildMongoQueryMatcher({ $or }, { or })

export function createAbility(permissionRules: PermissionRule[]) {
  return createMongoAbility(permissionRules, { conditionsMatcher })
}

export function checkPermission<TSubject extends keyof typeof AuthSubject>(
  ability: MongoAbility,
  subject: TSubject | typeof AUTH_SUBJECT_ALL,
  action: (typeof AuthAction)[TSubject][number] | typeof AUTH_ACTION_ALL,
  object?: Partial<SubjectEntityMapping[TSubject]> | null,
) {
  if (object != undefined) {
    return ability.can(action, assignSubject(subject, object))
  }

  return ability.can(action, subject)
}

export function isAuthorizedOneOf(
  userPermissions: PermissionRule[],
  authDetails: {
    subject: AuthSubjectUnionType
    action: AuthActionUnionType
    filterObj?: unknown
  }[],
): boolean {
  const ability = createAbility(userPermissions)

  return authDetails.some(({ subject, action, filterObj }) =>
    checkPermission(ability, subject, action, filterObj),
  )
}
