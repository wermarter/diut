import { Prop, Schema } from '@nestjs/mongoose'
import { BaseSchema, baseSchemaOptions } from '@diut/nest-core'

import { COLLECTION } from 'src/common/collections'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.BIO_PRODUCT,
})
export class BioProduct extends BaseSchema {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  index: number
}
