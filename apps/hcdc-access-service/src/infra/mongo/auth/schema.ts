import { MongoQuery } from '@casl/ability'
import {
  AuthActionUnionType,
  AuthActionValues,
  AuthSubjectUnionType,
  AuthSubjectValues,
} from '@diut/hcdc'
import { Prop, Schema } from '@nestjs/mongoose'
import { Schema as MongooseSchema } from 'mongoose'

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

  @Prop({ type: Boolean })
  inverted?: boolean

  @Prop({ type: MongooseSchema.Types.Mixed })
  conditions?: MongoQuery
}
