import { Prop, Schema } from '@nestjs/mongoose'
import { Schema as MongooseSchema, Types } from 'mongoose'
import { PatientCategory } from '@diut/common'

import { BaseSchema, baseSchemaOptions } from 'src/clients/mongo'
import { COLLECTION } from 'src/common/collections'
import { Test } from '../tests'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.TEST_ELEMENT,
})
export class TestElement extends BaseSchema {
  @Prop({ required: true })
  name: string

  @Prop({
    type: Types.ObjectId,
    ref: Test.name,
    index: true,
    required: true,
    autopopulate: true,
  })
  test: string | Test | null

  @Prop({ required: true })
  index: number

  @Prop({ required: true })
  isParent: boolean

  @Prop({ required: true, type: [MongooseSchema.Types.Mixed] })
  highlightRules: {
    category: PatientCategory
    min?: number
    max?: number
    normalValue?: string
    description?: string
    note?: string
    defaultChecked?: boolean
  }[]

  @Prop()
  unit?: string
}
