import { RecordTypes } from '@casl/mongoose'

import { BioProduct } from '../bio-product'
import { TestCategory } from '../test-category'

export const AuthSubject = {
  BioProduct: 'bio-product',
  TestCategory: 'test-category',
} as const satisfies Record<keyof RecordTypes, string>

export type AuthSubjectType = {
  BioProduct: BioProduct
  TestCategory: TestCategory
}
