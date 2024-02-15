import { MongoAbility } from '@casl/ability'
import type { FilterQuery } from 'mongoose'
import { accessibleBy } from '@casl/mongoose'
import type { PopulatePath } from '@diut/nestjs-infra'
import {
  AUTH_ACTION_ALL,
  AUTH_SUBJECT_ALL,
  AuthAction,
  AuthActionUnionType,
  AuthSubject,
  AuthSubjectUnionType,
  BaseEntity,
  SubjectEntityMapping,
  checkPermission,
} from '@diut/hcdc'

import { EAuthzPermissionDenied } from 'src/domain/exception'
import { EntityFindOneOptions } from '../interface'

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

export type AuthMappingFn<TEntity> = (path: PopulatePath<TEntity>) => {
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
