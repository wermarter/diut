import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { BaseSchema, baseSchemaOptions } from '@diut/nestjs-infra'
import { Types } from 'mongoose'
import { PermissionRule } from '@diut/hcdc'

import { COLLECTION } from '../collections'
import { BranchSchema } from '../branch'
import { PermissionRuleSchema } from '../auth'
import { RoleSchema } from '../role'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.USER,
  virtuals: {
    branches: {
      options: {
        ref: 'BranchSchema',
        localField: 'branchIds',
        foreignField: '_id',
        justOne: false,
      },
    },
    roles: {
      options: {
        ref: 'RoleSchema',
        localField: 'roleIds',
        foreignField: '_id',
        justOne: false,
      },
    },
  },
})
export class UserSchema extends BaseSchema {
  @Prop({ required: true })
  username: string

  @Prop({ required: true })
  passwordHash: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  phoneNumber: string

  @Prop({
    required: true,
    type: [SchemaFactory.createForClass(PermissionRuleSchema)],
  })
  inlinePermissions: PermissionRule[]

  @Prop({ required: true, type: [Types.ObjectId] })
  branchIds: string[]
  branches?: (BranchSchema | null)[]

  @Prop({ required: true, type: [Types.ObjectId] })
  roleIds: string[]
  roles?: (RoleSchema | null)[]
}
