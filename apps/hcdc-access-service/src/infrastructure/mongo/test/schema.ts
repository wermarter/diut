import { Prop, Schema } from '@nestjs/mongoose'
import { BaseSchema, baseSchemaOptions } from '@diut/nest-core'
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
  collection: COLLECTION.BIO_PRODUCT,
  virtuals: {
    branch: {
      options: {
        ref: BranchSchema.name,
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
  shouldNotPrint: boolean

  @Prop({ required: true })
  shouldDisplayWithChildren: boolean

  @Prop({ required: true, type: Types.ObjectId })
  bioProductId: string
  bioProduct?: BioProductSchema | null

  @Prop({ required: true, type: Types.ObjectId })
  instrumentId: string
  instrument?: InstrumentSchema | null

  @Prop({ required: true, type: Types.ObjectId })
  sampleTypeId: string
  sampleType?: SampleTypeSchema | null

  @Prop({ required: true, type: Types.ObjectId })
  testCategoryId: string
  testCategory?: TestCategorySchema | null

  @Prop({ required: true, type: Types.ObjectId })
  printFormId: string
  printForm?: PrintFormSchema | null

  @Prop({ required: true, type: Types.ObjectId })
  branchId: string
  branch?: BranchSchema | null
}
