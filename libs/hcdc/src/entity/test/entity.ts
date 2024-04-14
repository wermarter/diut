import { BaseEntity } from '../base-entity'
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

  printFormId: string | null
  printForm?: PrintForm | null

  branchId: string
  branch?: Branch | null
}

export enum TestAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}
