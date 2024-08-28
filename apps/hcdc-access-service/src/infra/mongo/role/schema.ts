import { PermissionRule } from '@diut/hcdc'
import { BaseSchema, baseSchemaOptions } from '@diut/nestjs-infra'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

import { PermissionRuleSchema } from '../auth'
import { BranchSchema } from '../branch'
import { COLLECTION } from '../collections'

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

  @Prop({ required: false })
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
