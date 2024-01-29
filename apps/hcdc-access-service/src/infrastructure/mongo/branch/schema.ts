import { Prop, Schema } from '@nestjs/mongoose'
import { BaseSchema, baseSchemaOptions } from '@diut/nestjs-core'
import { Types } from 'mongoose'

import { COLLECTION } from '../collections'
import { BranchType, BranchTypeValues } from 'src/domain'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.BRANCH,
  virtuals: {
    sampleOrigins: {
      options: {
        ref: BranchSchema.name,
        localField: 'sampleOriginIds',
        foreignField: '_id',
        justOne: false,
      },
    },
  },
})
export class BranchSchema extends BaseSchema {
  @Prop({ required: true })
  displayIndex: number

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  address: string

  @Prop({ required: true, enum: BranchTypeValues })
  type: BranchType

  @Prop({ required: true, type: [Types.ObjectId] })
  sampleOriginIds: string[]
  sampleOrigins?: (BranchSchema | null)[]
}
