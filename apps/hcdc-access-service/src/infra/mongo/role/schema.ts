import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { BaseSchema, baseSchemaOptions } from '@diut/nestjs-infra'
import { Types } from 'mongoose'
import { PermissionRule } from '@diut/hcdc'

import { COLLECTION } from '../collections'
import { BranchSchema } from '../branch'
import { PermissionRuleSchema } from '../auth'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.ROLE,
  virtuals: {
    branch: {
      options: {
        ref: 'BranchSchema',
        localField: 'branchId',
        foreignField: '_id',
        justOne: true,
      },
    },
  },
})
export class RoleSchema extends BaseSchema {
  @Prop({ required: true })
  displayIndex: number

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  description: string

  @Prop({
    required: true,
    type: [SchemaFactory.createForClass(PermissionRuleSchema)],
  })
  permissions: PermissionRule[]

  @Prop({ required: true, type: Types.ObjectId })
  branchId: string
  branch?: BranchSchema | null
}
