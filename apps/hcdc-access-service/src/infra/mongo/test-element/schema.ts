import { NormalRule, PatientCategory, PatientCategoryValues } from '@diut/hcdc'
import { BaseSchema, baseSchemaOptions } from '@diut/nestjs-infra'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { BranchSchema } from '../branch'
import { COLLECTION } from '../collections'
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

  @Prop({ required: false })
  description: string

  @Prop({ required: false })
  note: string
}

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.TEST_ELEMENT,
  virtuals: {
    test: {
      options: {
        ref: 'TestSchema',
        localField: 'testId',
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
export class TestElementSchema extends BaseSchema {
  @Prop({ required: true })
  displayIndex: number

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  printIndex: number

  @Prop({ required: true })
  reportIndex: number

  @Prop({ required: false })
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
  branch?: BranchSchema
}
