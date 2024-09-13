import { MongoAbility } from '@casl/ability'
import { permittedFieldsOf } from '@casl/ability/extra'
import { accessibleBy } from '@casl/mongoose'
import {
  AUTH_ACTION_ALL,
  AUTH_SUBJECT_ALL,
  AuthAction,
  AuthActionUnionType,
  AuthSubject,
  AuthSubjectUnionType,
  BaseEntity,
  PermissionRule,
  SubjectEntityMapping,
  User,
  checkPermission,
  subjectFieldsMapping,
} from '@diut/hcdc'
import type { PopulatePath } from '@diut/nestjs-infra'
const buildJSONTemplate = require('json-templates')

import { EAuthzPermissionDenied, EntityFindOneOptions } from 'src/domain'

export type PermissionRuleTemplateContext = { user: User }
export function compilePermissionRules(
  templates: PermissionRule[],
  context: PermissionRuleTemplateContext,
) {
  const templateFn = buildJSONTemplate(templates)
  return templateFn(context) as PermissionRule[]
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

    const allowedFields = permittedFieldsOf(ability, action, subject, {
      fieldsFrom: (rule) => rule.fields || subjectFieldsMapping[subject],
    })
    populate.fields = populate.fields?.filter((field) =>
      allowedFields.includes(field),
    )

    const authMatchObj = accessibleBy(ability, action).ofType(subject)
    if (populate.match) {
      if (typeof populate.match === 'function') {
        populate.match = populate.match()
      }

      populate.match = { $and: [populate.match, authMatchObj] }
    }

    rv.push(populate)
  }

  return rv
}
