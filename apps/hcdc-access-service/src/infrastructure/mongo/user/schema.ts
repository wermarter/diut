import { Prop, Schema } from '@nestjs/mongoose'
import { BaseSchema, baseSchemaOptions } from '@diut/nest-core'
import { Types } from 'mongoose'

import { COLLECTION } from '../collections'
import { BranchSchema } from '../branch'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.USER,
  virtuals: {
    branches: {
      options: {
        ref: BranchSchema.name,
        localField: 'branchIds',
        foreignField: '_id',
        justOne: false,
      },
    },
  },
})
export class UserSchema extends BaseSchema {
  @Prop({ required: true, unique: true })
  username: string

  @Prop({ required: true })
  passwordHash: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  phoneNumber: string

  @Prop({ required: true, type: [Types.ObjectId] })
  branchIds: string[]

  branches?: (BranchSchema | null)[]
}
