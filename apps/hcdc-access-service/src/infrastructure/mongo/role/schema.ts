import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { BaseSchema, baseSchemaOptions } from '@diut/nest-core'
import { Types, Schema as MongooseSchema } from 'mongoose'
import { MongoQuery } from '@casl/ability'

import { COLLECTION } from '../collections'
import {
  AuthActionUnionType,
  AuthActionValues,
  AuthSubjectUnionType,
  AuthSubjectValues,
  PermissionRule,
} from 'src/domain'
import { BranchSchema } from '../branch'

@Schema({ _id: false })
export class PermissionRuleSchema {
  @Prop({ required: true, type: String, enum: AuthSubjectValues })
  subject: AuthSubjectUnionType

  @Prop({
    required: true,
    type: String,
    enum: AuthActionValues,
  })
  action: AuthActionUnionType

  @Prop({})
  inverted?: boolean

  @Prop({ type: MongooseSchema.Types.Mixed })
  conditions?: MongoQuery
}

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
