import { Prop, Schema } from '@nestjs/mongoose'
import { BaseSchema, baseSchemaOptions } from '@diut/nestjs-infra'
import { Types } from 'mongoose'

import { COLLECTION } from '../collections'
import { BranchSchema } from '../branch'
import { BioProductSchema } from '../bio-product'
import { InstrumentSchema } from '../instrument'
import { SampleTypeSchema } from '../sample-type'
import { TestCategorySchema } from '../test-category'
import { PrintFormSchema } from '../print-form'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.TEST,
  virtuals: {
    bioProduct: {
      options: {
        ref: 'BioProductSchema',
        localField: 'bioProductId',
        foreignField: '_id',
        justOne: true,
      },
    },
    instrument: {
      options: {
        ref: 'InstrumentSchema',
        localField: 'instrumentId',
        foreignField: '_id',
        justOne: true,
      },
    },
    sampleType: {
      options: {
        ref: 'SampleTypeSchema',
        localField: 'sampleTypeId',
        foreignField: '_id',
        justOne: true,
      },
    },
    testCategory: {
      options: {
        ref: 'TestCategorySchema',
        localField: 'testCategoryId',
        foreignField: '_id',
        justOne: true,
      },
    },
    printForm: {
      options: {
        ref: 'PrintFormSchema',
        localField: 'printFormId',
        foreignField: '_id',
        justOne: true,
      },
    },
    branch: {
      options: {
        ref: 'BranchSchema',
        localField: 'branchId',
        foreignField: '_id',
        justOne: true,
      },
    },
  },
})
export class TestSchema extends BaseSchema {
  @Prop({ required: true })
  displayIndex: number

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  shouldDisplayWithChildren: boolean

  @Prop({ required: false, type: Types.ObjectId })
  bioProductId: string | null
  bioProduct?: BioProductSchema | null

  @Prop({ required: false, type: Types.ObjectId })
  instrumentId: string | null
  instrument?: InstrumentSchema | null

  @Prop({ required: false, type: Types.ObjectId })
  sampleTypeId: string | null
  sampleType?: SampleTypeSchema | null

  @Prop({ required: true, type: Types.ObjectId })
  testCategoryId: string
  testCategory?: TestCategorySchema | null

  @Prop({ required: false, type: Types.ObjectId })
  printFormId: string | null
  printForm?: PrintFormSchema | null

  @Prop({ required: true, type: Types.ObjectId })
  branchId: string
  branch?: BranchSchema | null
}
