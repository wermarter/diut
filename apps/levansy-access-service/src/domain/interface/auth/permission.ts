import { MongoAbility } from '@casl/ability'

import { AuthSubjectAction } from 'src/domain/entity'

export function checkPermission<TSubject extends keyof AuthSubjectAction>(
  ability: MongoAbility,
  subject: TSubject,
  action: AuthSubjectAction[TSubject],
) {
  return ability.can(action, subject)
}
