import { Prop, Schema } from '@nestjs/mongoose'
import { BaseSchema, baseSchemaOptions } from '@diut/nest-core'

import { COLLECTION } from '../collections'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.TEST_CATEGORY,
})
export class TestCategorySchema extends BaseSchema {
  @Prop({ required: true })
  index: number

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  reportIndex: number
}
