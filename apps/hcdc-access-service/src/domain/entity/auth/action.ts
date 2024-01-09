import { RecordTypes } from '@casl/mongoose'

import { BioProductAction } from '../bio-product'
import { TestCategoryAction } from '../test-category'

function extractSecondHalf(items: string[]) {
  return items.slice(items.length / 2)
}

export const AuthAction = {
  BioProduct: extractSecondHalf(
    Object.values(BioProductAction),
  ) as `${BioProductAction}`[],

  TestCategory: extractSecondHalf(
    Object.values(TestCategoryAction),
  ) as `${TestCategoryAction}`[],
} as const satisfies Record<keyof RecordTypes, string[]>
