import { stringEnumValues } from '@diut/common'

import { AuthSubject, AuthSubjectUnionType } from './subject'
import {
  BioProductAction,
  BranchAction,
  RoleAction,
  TestCategoryAction,
  UserAction,
} from '../entity'
import { AUTH_ACTION_ALL } from './constants'

export const AuthAction = {
  BioProduct: stringEnumValues(BioProductAction),
  TestCategory: stringEnumValues(TestCategoryAction),
  Branch: stringEnumValues(BranchAction),
  Role: stringEnumValues(RoleAction),
  User: stringEnumValues(UserAction),
} satisfies Record<keyof typeof AuthSubject, string[]>

export const AuthActionValues = [
  ...new Set(Object.values(AuthAction).flat()),
  AUTH_ACTION_ALL,
]

export type AuthActionUnionType =
  (typeof AuthAction)[AuthSubjectUnionType][number]
