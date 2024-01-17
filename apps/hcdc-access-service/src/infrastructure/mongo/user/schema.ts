import { Prop, Schema } from '@nestjs/mongoose'
import { BaseSchema, baseSchemaOptions } from '@diut/nest-core'
import { Types } from 'mongoose'

import { COLLECTION } from '../collections'
import { BranchSchema } from '../branch'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.USER,
  virtuals: {
    branch: {
      options: {
        ref: BranchSchema.name,
        localField: 'branchId',
        foreignField: '_id',
        justOne: true,
      },
    },
  },
})
export class UserSchema extends BaseSchema {
  @Prop({ required: true, unique: true })
  username: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  phoneNumber: string

  @Prop({ required: true, type: Types.ObjectId })
  branchId: string

  branch?: BranchSchema | null
}
