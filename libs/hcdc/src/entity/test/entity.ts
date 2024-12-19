import { AssertAllKeysInArray } from '@diut/common'
import { BaseEntity, baseEntityKeys } from '../base-entity'
import { BioProduct } from '../bio-product'
import { Branch } from '../branch'
import { Instrument } from '../instrument'
import { PrintForm } from '../print-form'
import { SampleType } from '../sample-type'
import { TestCategory } from '../test-category'

export type Test = BaseEntity & {
  displayIndex: number
  name: string
  shouldDisplayWithChildren: boolean

  bioProductId: string | null
  bioProduct?: BioProduct | null

  instrumentId: string | null
  instrument?: Instrument | null

  sampleTypeId: string | null
  sampleType?: SampleType | null

  testCategoryId: string
  testCategory?: TestCategory | null

  printFormIds: string[]
  printForms?: (PrintForm | null)[]

  branchId: string
  branch?: Branch | null
}

export enum TestAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

export const TestFields = [
  ...baseEntityKeys,
  'displayIndex',
  'name',
  'shouldDisplayWithChildren',
  'bioProductId',
  'bioProduct',
  'instrumentId',
  'instrument',
  'sampleTypeId',
  'sampleType',
  'testCategoryId',
  'testCategory',
  'printFormIds',
  'printForms',
  'branchId',
  'branch',
] satisfies (keyof Test)[]

true satisfies AssertAllKeysInArray<typeof TestFields, Test>
