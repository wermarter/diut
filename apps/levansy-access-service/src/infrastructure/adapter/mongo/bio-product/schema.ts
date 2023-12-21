import { Prop, Schema } from '@nestjs/mongoose'
import { BaseSchema, baseSchemaOptions } from '@diut/nest-core'

import { COLLECTION } from '../collections'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.BIO_PRODUCT,
})
export class BioProductSchema extends BaseSchema {
  @Prop({ required: true })
  index: number

  @Prop({ required: true })
  name: string
}
