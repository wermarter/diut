import { BranchReportConfig, BranchType, BranchTypeValues } from '@diut/hcdc'
import { BaseSchema, baseSchemaOptions } from '@diut/nestjs-infra'
import { Prop, Schema } from '@nestjs/mongoose'
import { Schema as MongooseSchema, Types } from 'mongoose'
import { COLLECTION } from '../collections'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.BRANCH,
  virtuals: {
    sampleOrigins: {
      options: {
        ref: 'BranchSchema',
        localField: 'sampleOriginIds',
        foreignField: '_id',
        justOne: false,
      },
    },
  },
})
export class BranchSchema extends BaseSchema {
  @Prop({ required: true, type: Number })
  displayIndex: number

  @Prop({ required: true, type: String })
  name: string

  @Prop({ required: true, type: String })
  address: string

  @Prop({ required: true, enum: BranchTypeValues, type: String })
  type: BranchType

  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  reportConfig: BranchReportConfig

  @Prop({ required: true, type: [Types.ObjectId] })
  sampleOriginIds: string[]
  sampleOrigins?: BranchSchema[]
}
