import { RecordTypes } from '@casl/mongoose'

import { BioProduct, Branch, Role, TestCategory, User } from '../entity'
import { AUTH_SUBJECT_ALL } from './constants'

// key-value must be identical for working with '@casl/mongoose'.accessibleBy()
export const AuthSubject = {
  BioProduct: 'BioProduct',
  TestCategory: 'TestCategory',
  Branch: 'Branch',
  Role: 'Role',
  User: 'User',
} satisfies Record<keyof RecordTypes, keyof RecordTypes>

export type AuthSubjectUnionType = keyof typeof AuthSubject

export const AuthSubjectValues = [
  ...Object.keys(AuthSubject),
  AUTH_SUBJECT_ALL,
] as AuthSubjectUnionType[]

export type SubjectEntityMapping = {
  BioProduct: BioProduct
  TestCategory: TestCategory
  Branch: Branch
  Role: Role
  User: User
}
