import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { BaseSchema, baseSchemaOptions } from '@diut/nest-core'
import { Types } from 'mongoose'

import { COLLECTION } from '../collections'
import { PermissionRule } from 'src/domain'
import { BranchSchema } from '../branch'
import { PermissionRuleSchema } from '../auth'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.ROLE,
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
export class RoleSchema extends BaseSchema {
  @Prop({ required: true })
  index: number

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  description: string

  @Prop({
    required: true,
    type: [SchemaFactory.createForClass(PermissionRuleSchema)],
  })
  permissions: PermissionRule[]

  @Prop({ required: true, type: [Types.ObjectId] })
  branchIds: string[]
  branches?: (BranchSchema | null)[]
}
