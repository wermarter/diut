import { Prop, Schema } from '@nestjs/mongoose'

import { BaseSchema, baseSchemaOptions } from 'src/clients/mongo'
import { COLLECTION } from 'src/common/collections'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.SAMPLE_TYPE,
})
export class SampleType extends BaseSchema {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  leftRightIndex: number
}
