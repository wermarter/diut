import { Prop, Schema } from '@nestjs/mongoose'
import { BaseSchema, baseSchemaOptions } from '@diut/nestjs-core'
import { Types } from 'mongoose'

import { COLLECTION } from '../collections'
import { BranchSchema } from '../branch'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.INSTRUMENT,
  virtuals: {
    branch: {
      options: {
        ref: BranchSchema.name,
        localField: 'branchId',
        foreignField: '_id',
        justOne: true,
      },
    },
  },
})
export class InstrumentSchema extends BaseSchema {
  @Prop({ required: true })
  displayIndex: number

  @Prop({ required: true })
  name: string

  @Prop({ required: true, type: Types.ObjectId })
  branchId: string
  branch?: BranchSchema | null
}
