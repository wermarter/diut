import { BioProductAction } from './bio-product'
import { TestCategoryAction } from './test-category'

export enum AuthSubject {
  BioProduct = 'bio-product',
  TestCategory = 'test-category',
}

export type AuthSubjectAction = {
  [AuthSubject.BioProduct]: `${BioProductAction}`
  [AuthSubject.TestCategory]: `${TestCategoryAction}`
}
