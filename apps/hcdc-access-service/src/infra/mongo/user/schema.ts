import { PermissionRule } from '@diut/hcdc'
import { BaseSchema, baseSchemaOptions } from '@diut/nestjs-infra'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { PermissionRuleSchema } from '../auth'
import { BranchSchema } from '../branch'
import { COLLECTION } from '../collections'
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
  @Prop({ required: true, type: String })
  username: string

  @Prop({ required: true, type: String })
  passwordHash: string

  @Prop({ required: true, type: String })
  name: string

  @Prop({ required: true, type: String })
  phoneNumber: string

  @Prop({
    required: true,
    type: [SchemaFactory.createForClass(PermissionRuleSchema)],
  })
  inlinePermissions: PermissionRule[]

  @Prop({ required: true, type: [Types.ObjectId] })
  branchIds: string[]
  branches?: BranchSchema[]

  @Prop({ required: true, type: [Types.ObjectId] })
  roleIds: string[]
  roles?: RoleSchema[]
}
