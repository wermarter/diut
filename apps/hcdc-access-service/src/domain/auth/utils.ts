import {
  MongoAbility,
  subject as assignSubject,
  buildMongoQueryMatcher,
  createMongoAbility,
} from '@casl/ability'
import { $or, or } from '@ucast/mongo2js'
import { FilterQuery } from 'mongoose'
import { accessibleBy } from '@casl/mongoose'

import { AuthAction, AuthActionUnionType } from './action'
import {
  AuthSubject,
  AuthSubjectUnionType,
  SubjectEntityMapping,
} from './subject'
import { EAuthzPermissionDenied } from 'src/domain/exception'
import { AUTH_ACTION_ALL, AUTH_SUBJECT_ALL } from './constants'
import { BaseEntity, PermissionRule } from '../entity'
import { EntityFindOneOptions } from '../interface'

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

export function assertPermission<TSubject extends keyof typeof AuthSubject>(
  ability: MongoAbility,
  subject: TSubject | typeof AUTH_SUBJECT_ALL,
  action: (typeof AuthAction)[TSubject][number] | typeof AUTH_ACTION_ALL,
  object?: Partial<SubjectEntityMapping[TSubject]> | null,
) {
  if (!checkPermission(ability, subject, action, object)) {
    throw new EAuthzPermissionDenied(
      `${action} -> ${object != undefined ? 'this' : 'any'} ${subject}`,
    )
  }
}

export type AuthMappingFn<TEntity> = (path: keyof TEntity) => {
  subject: AuthSubjectUnionType
  action: AuthActionUnionType
}

export function authorizePopulates<TEntity extends BaseEntity>(
  ability: MongoAbility,
  populates: EntityFindOneOptions<TEntity>['populates'],
  authMapping: AuthMappingFn<TEntity>,
) {
  if (populates === undefined) {
    return
  }

  const rv: EntityFindOneOptions<TEntity>['populates'] = []
  for (const populate of populates) {
    const { subject, action } = authMapping(populate.path)
    const authMatchObj = accessibleBy(ability, action)[subject]
    if (populate.match) {
      let matchObject: FilterQuery<TEntity>

      if (typeof populate.match === 'function') {
        matchObject = populate.match()
      } else {
        matchObject = populate.match
      }

      rv.push({
        ...populate,
        match: { $and: [matchObject, authMatchObj] },
      })
    } else {
      rv.push({ ...populate, match: authMatchObj })
    }
  }

  return rv
}
