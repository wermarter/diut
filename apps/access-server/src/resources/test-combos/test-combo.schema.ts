import { Prop, Schema } from '@nestjs/mongoose'
import { Types } from 'mongoose'

import { BaseSchema, baseSchemaOptions } from 'src/clients/mongo'
import { COLLECTION } from 'src/common/collections'
import { Test } from '../tests'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.TEST_COMBO,
})
export class TestCombo extends BaseSchema {
  @Prop({ required: true })
  name: string

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: Test.name,
      },
    ],
    index: true,
    required: true,
  })
  children: string[] | Test[]
}
