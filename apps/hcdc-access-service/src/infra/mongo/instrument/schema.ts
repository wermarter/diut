import { Prop, Schema } from '@nestjs/mongoose'
import { BaseSchema, baseSchemaOptions } from '@diut/nestjs-infra'
import { Types } from 'mongoose'

import { COLLECTION } from '../collections'
import { BranchSchema } from '../branch'
import { TestSchema } from '../test'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.INSTRUMENT,
  virtuals: {
    test: {
      options: {
        ref: 'TestSchema',
        localField: 'testId',
        foreignField: '_id',
        justOne: true,
      },
    },
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
export class InstrumentSchema extends BaseSchema {
  @Prop({ required: true })
  displayIndex: number

  @Prop({ required: true })
  name: string

  @Prop({ required: true, type: Types.ObjectId })
  testId: string
  test?: TestSchema | null

  @Prop({ required: true, type: Types.ObjectId })
  branchId: string
  branch?: BranchSchema | null
}
