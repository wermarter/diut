import { Prop, Schema } from '@nestjs/mongoose'

import { BaseSchema, baseSchemaOptions } from 'src/clients/mongo'
import { AppPermission } from 'src/common/app-permission'
import { COLLECTION } from 'src/common/collections'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.USER,
})
export class User extends BaseSchema {
  @Prop()
  username: string

  @Prop()
  password: string

  @Prop()
  name: string

  @Prop()
  permissions: AppPermission[]
}
