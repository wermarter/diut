import { RecordTypes } from '@casl/mongoose'

import { BioProduct } from '../bio-product'
import { TestCategory } from '../test-category'

// key-value must be identical for working with '@casl/mongoose'.accessibleBy()
export const AuthSubject = {
  BioProduct: 'BioProduct',
  TestCategory: 'TestCategory',
} satisfies Record<keyof RecordTypes, keyof RecordTypes>

export type SubjectEntityMapping = {
  BioProduct: BioProduct
  TestCategory: TestCategory
}
