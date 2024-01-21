import { Prop, Schema } from '@nestjs/mongoose'
import { BaseSchema, baseSchemaOptions } from '@diut/nest-core'

import { COLLECTION } from '../collections'
import { BranchType } from 'src/domain'

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

  @Prop({ required: true, enum: BranchType })
  type: BranchType
}
