import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { BaseSchema, baseSchemaOptions } from '@diut/nestjs-infra'
import { Types } from 'mongoose'
import { NormalRule, PatientCategory, PatientCategoryValues } from '@diut/hcdc'

import { COLLECTION } from '../collections'
import { BranchSchema } from '../branch'
import { TestSchema } from '../test/schema'

@Schema({ _id: false })
export class NormalRuleSchema {
  @Prop({ required: true, type: String, enum: PatientCategoryValues })
  category: PatientCategory

  @Prop({ required: false })
  defaultChecked?: boolean

  @Prop({ required: false })
  normalValue?: string

  @Prop({ required: false })
  normalLowerBound?: number

  @Prop({ required: false })
  normalUpperBound?: number

  @Prop({ required: true })
  description: string

  @Prop({ required: true })
  note: string
}

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.TEST_ELEMENT,
  virtuals: {
    test: {
      options: {
        ref: TestSchema.name,
        localField: 'testId',
        foreignField: '_id',
        justOne: true,
      },
    },
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
export class TestElementSchema extends BaseSchema {
  @Prop({ required: true })
  displayIndex: number

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  printIndex: number

  @Prop({ required: true })
  reportIndex: number

  @Prop({ required: true })
  unit: string

  @Prop({ required: true })
  isParent: boolean

  @Prop({
    required: true,
    type: [SchemaFactory.createForClass(NormalRuleSchema)],
  })
  normalRules: NormalRule[]

  @Prop({ required: true, type: Types.ObjectId })
  testId: string
  test?: TestSchema | null

  @Prop({ required: true, type: Types.ObjectId })
  branchId: string
  branch?: BranchSchema | null
}
