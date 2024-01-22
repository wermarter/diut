import { RecordTypes } from '@casl/mongoose'

import { BioProduct } from '../bio-product'
import { TestCategory } from '../test-category'
import { Branch } from '../branch'
import { Role } from '../role'
import { User } from '../user'

// key-value must be identical for working with '@casl/mongoose'.accessibleBy()
export const AuthSubject = {
  BioProduct: 'BioProduct',
  TestCategory: 'TestCategory',
  Branch: 'Branch',
  Role: 'Role',
  User: 'User',
} satisfies Record<keyof RecordTypes, keyof RecordTypes>

export type AuthSubjectUnionType = keyof typeof AuthSubject

export const AuthSubjectValues = Object.keys(
  AuthSubject,
) as AuthSubjectUnionType[]

export type SubjectEntityMapping = {
  BioProduct: BioProduct
  TestCategory: TestCategory
  Branch: Branch
  Role: Role
  User: User
}
