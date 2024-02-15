import { MongoQuery } from '@casl/ability'
import { Prop, Schema } from '@nestjs/mongoose'
import { Schema as MongooseSchema } from 'mongoose'
import {
  AuthActionUnionType,
  AuthActionValues,
  AuthSubjectUnionType,
  AuthSubjectValues,
} from '@diut/hcdc'

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
