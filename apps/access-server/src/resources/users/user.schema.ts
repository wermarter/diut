import { Permission } from '@diut/common'
import { Prop, Schema } from '@nestjs/mongoose'

import { BaseSchema, baseSchemaOptions } from 'src/clients/mongo'
import { COLLECTION } from 'src/common/collections'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.USER,
})
export class User extends BaseSchema {
  @Prop({ required: true, unique: true })
  username: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true })
  name: string

  @Prop()
  phoneNumber?: string

  @Prop({
    type: [{ enum: Permission, type: String }],
    required: true,
  })
  permissions: Permission[]
}
