import { stringEnumValues } from '@diut/common'

import { AuthSubject, AuthSubjectUnionType } from './subject'
import { BioProductAction } from '../bio-product'
import { TestCategoryAction } from '../test-category'
import { BranchAction } from '../branch'
import { RoleAction } from '../role'

export const AuthAction = {
  BioProduct: stringEnumValues(BioProductAction),
  TestCategory: stringEnumValues(TestCategoryAction),
  Branch: stringEnumValues(BranchAction),
  Role: stringEnumValues(RoleAction),
} satisfies Record<keyof typeof AuthSubject, string[]>

export const AuthActions = Object.values(AuthAction).flat()

export type AuthActionUnionType =
  (typeof AuthAction)[AuthSubjectUnionType][number]
