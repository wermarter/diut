import { Prop, Schema } from '@nestjs/mongoose'
import { BaseSchema, baseSchemaOptions } from '@diut/nest-core'

import { COLLECTION } from '../collections'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.BRANCH,
})
export class BranchSchema extends BaseSchema {
  @Prop({ required: true })
  index: number

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  address: string
}
