import { stringEnumValues } from '@diut/common'

import { AuthSubject, AuthSubjectUnionType } from './subject'

// NOTE: beware of circular dependency
import { BioProductAction } from '../bio-product/auth'
import { TestCategoryAction } from '../test-category/auth'
import { BranchAction } from '../branch/auth'
import { RoleAction } from '../role/auth'
import { UserAction } from '../user/auth'

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
