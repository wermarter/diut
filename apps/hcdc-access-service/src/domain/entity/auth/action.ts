import { stringEnumValues } from '@diut/common'
import { RecordTypes } from '@casl/mongoose'

import { BioProductAction } from '../bio-product'
import { TestCategoryAction } from '../test-category'

export const AuthAction = {
  BioProduct: stringEnumValues(BioProductAction),
  TestCategory: stringEnumValues(TestCategoryAction),
} satisfies Record<keyof RecordTypes, string[]>
