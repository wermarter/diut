import { Role } from '@diut/common'
import { Prop, Schema } from '@nestjs/mongoose'

import { BaseSchema, baseSchemaOptions } from 'src/clients/mongo'
import { AppPermission } from 'src/common/app-permission'
import { COLLECTION } from 'src/common/collections'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.USER,
})
export class User extends BaseSchema {
  @Prop({ unique: true, required: true })
  username: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true })
  name: string

  @Prop()
  phoneNumber?: string

  @Prop({
    type: [{ enum: Role, type: String }],
    required: true,
  })
  roles: Role[]

  @Prop({
    type: [{ enum: AppPermission, type: String }],
    required: true,
  })
  permissions: AppPermission[]
}
