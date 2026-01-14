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

  @Prop({ required: false, type: Boolean })
  defaultChecked?: boolean

  @Prop({ required: false, type: String })
  normalValue?: string

  @Prop({ required: false, type: Number })
  normalLowerBound?: number

  @Prop({ required: false, type: Number })
  normalUpperBound?: number

  @Prop({ required: false, type: String })
  description: string

  @Prop({ required: false, type: String })
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
  @Prop({ required: true, type: Number })
  displayIndex: number

  @Prop({ required: true, type: String })
  name: string

  @Prop({ required: true, type: Number })
  printIndex: number

  @Prop({ required: true, type: Number })
  reportIndex: number

  @Prop({ required: false, type: String })
  unit: string

  @Prop({ required: true, type: Boolean })
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
