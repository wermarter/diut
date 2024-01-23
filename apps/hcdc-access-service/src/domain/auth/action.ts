import { stringEnumValues } from '@diut/common'

import { AuthSubject, AuthSubjectUnionType } from './subject'
import {
  BioProductAction,
  BranchAction,
  RoleAction,
  TestCategoryAction,
  UserAction,
} from '../entity'

export const AuthAction = {
  BioProduct: stringEnumValues(BioProductAction),
  TestCategory: stringEnumValues(TestCategoryAction),
  Branch: stringEnumValues(BranchAction),
  Role: stringEnumValues(RoleAction),
  User: stringEnumValues(UserAction),
} satisfies Record<keyof typeof AuthSubject, string[]>

export const AuthActionValues = [...new Set(Object.values(AuthAction).flat())]

export type AuthActionUnionType =
  (typeof AuthAction)[AuthSubjectUnionType][number]
