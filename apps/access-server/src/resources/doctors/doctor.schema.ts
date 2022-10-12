import { Prop, Schema } from '@nestjs/mongoose'

import { BaseSchema, baseSchemaOptions } from 'src/clients/mongo'
import { COLLECTION } from 'src/common/collections'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.DOCTOR,
})
export class Doctor extends BaseSchema {
  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  name: string
}
