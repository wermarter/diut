import { Prop, Schema } from '@nestjs/mongoose'
import { BaseSchema, baseSchemaOptions } from '@diut/nest-core'

import { COLLECTION } from '../collections'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.USER,
})
export class UserSchema extends BaseSchema {
  @Prop({ required: true, unique: true })
  username: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true })
  name: string

  @Prop()
  phoneNumber?: string
}
