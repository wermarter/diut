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
  bioProduct?: BioProduct

  instrumentId: string | null
  instrument?: Instrument

  sampleTypeId: string | null
  sampleType?: SampleType

  testCategoryId: string
  testCategory?: TestCategory

  printFormIds: string[]
  printForms?: PrintForm[]

  branchId: string
  branch?: Branch
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
