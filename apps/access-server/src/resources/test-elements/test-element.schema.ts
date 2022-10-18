import { Prop, Schema } from '@nestjs/mongoose'
import { Schema as MongooseSchema, Types } from 'mongoose'

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
  topBottomIndex: number

  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  highlightRule:
    | undefined
    | any
    | {
        [patientCategory in
          | 'any'
          | 'boy'
          | 'girl'
          | 'man'
          | 'woman'
          | 'pregnant']: {
          min: number
          max: number
          normalValue: string
          description: string
        }
      }

  @Prop()
  unit?: string

  @Prop()
  notice?: string
}
