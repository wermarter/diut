import { Prop, Schema } from '@nestjs/mongoose'
import { BaseSchema, baseSchemaOptions } from '@diut/nest-core'
import { Types } from 'mongoose'

import { COLLECTION } from '../collections'
import { BranchType } from 'src/domain'

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

  @Prop({ required: true, enum: BranchType })
  type: BranchType

  @Prop({ required: true, type: [Types.ObjectId] })
  sampleOriginIds: string[]
  sampleOrigins?: (BranchSchema | null)[]
}
