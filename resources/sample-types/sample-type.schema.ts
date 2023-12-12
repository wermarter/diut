import { Prop, Schema } from '@nestjs/mongoose'

import { BaseSchema, baseSchemaOptions } from '@diut/nest-core'
import { COLLECTION } from 'src/infrastructure/mongo/collections'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.SAMPLE_TYPE,
})
export class SampleType extends BaseSchema {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  index: number
}
