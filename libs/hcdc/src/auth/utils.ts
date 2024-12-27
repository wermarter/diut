import { MongoAbility, subject as assignSubject } from '@casl/ability'
import { PermissionRule } from '../entity'
import { AuthAction, AuthActionUnionType } from './action'
import { AUTH_ACTION_ALL, AUTH_SUBJECT_ALL } from './constants'
import { createAbility } from './extend'
import {
  AuthSubject,
  AuthSubjectUnionType,
  SubjectEntityMapping,
} from './subject'

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

export function isAuthorizedAllOf(
  userPermissions: PermissionRule[],
  authDetails: {
    subject: AuthSubjectUnionType
    action: AuthActionUnionType
    filterObj?: unknown
  }[],
): boolean {
  const ability = createAbility(userPermissions)

  return authDetails.every(({ subject, action, filterObj }) =>
    checkPermission(ability, subject, action, filterObj),
  )
}
