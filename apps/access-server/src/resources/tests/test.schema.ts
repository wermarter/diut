import { Prop, Schema } from '@nestjs/mongoose'
import { Types } from 'mongoose'

import { BaseSchema, baseSchemaOptions } from 'src/clients/mongo'
import { COLLECTION } from 'src/common/collections'
import { TestCategory } from '../test-categories'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.TEST,
})
export class Test extends BaseSchema {
  @Prop({
    type: Types.ObjectId,
    ref: TestCategory.name,
    index: true,
    required: true,
    autopopulate: true,
  })
  category: string | TestCategory | null

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  topBottomIndex: number
}
