import { BaseSchema, baseSchemaOptions } from '@diut/nestjs-infra'
import { Prop, Schema } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { BioProductSchema } from '../bio-product'
import { BranchSchema } from '../branch'
import { COLLECTION } from '../collections'
import { InstrumentSchema } from '../instrument'
import { PrintFormSchema } from '../print-form'
import { SampleTypeSchema } from '../sample-type'
import { TestCategorySchema } from '../test-category'

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
    printForms: {
      options: {
        ref: 'PrintFormSchema',
        localField: 'printFormIds',
        foreignField: '_id',
        justOne: false,
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
  @Prop({ required: true, type: Number })
  displayIndex: number

  @Prop({ required: true, type: String })
  name: string

  @Prop({ required: true, type: Boolean })
  shouldDisplayWithChildren: boolean

  @Prop({ required: false, type: Types.ObjectId })
  bioProductId: string | null
  bioProduct?: BioProductSchema

  @Prop({ required: false, type: Types.ObjectId })
  instrumentId: string | null
  instrument?: InstrumentSchema

  @Prop({ required: false, type: Types.ObjectId })
  sampleTypeId: string | null
  sampleType?: SampleTypeSchema

  @Prop({ required: true, type: Types.ObjectId })
  testCategoryId: string
  testCategory?: TestCategorySchema

  @Prop({ required: false, type: Types.ObjectId })
  printFormIds: string[]
  printForms?: PrintFormSchema[]

  @Prop({ required: true, type: Types.ObjectId })
  branchId: string
  branch?: BranchSchema
}
