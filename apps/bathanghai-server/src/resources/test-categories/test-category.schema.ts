import { Prop, Schema } from '@nestjs/mongoose'

import { BaseSchema, baseSchemaOptions } from '@diut/server-core'
import { COLLECTION } from 'src/common/collections'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.TEST_CATEGORY,
})
export class TestCategory extends BaseSchema {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  index: number

  @Prop({ required: true })
  reportIndex: number
}
