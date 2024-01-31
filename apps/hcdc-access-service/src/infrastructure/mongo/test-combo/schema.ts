import { Prop, Schema } from '@nestjs/mongoose'
import { BaseSchema, baseSchemaOptions } from '@diut/nestjs-infra'
import { Types } from 'mongoose'

import { COLLECTION } from '../collections'
import { BranchSchema } from '../branch'
import { TestSchema } from '../test/schema'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.TEST_COMBO,
  virtuals: {
    tests: {
      options: {
        ref: TestSchema.name,
        localField: 'testIds',
        foreignField: '_id',
        justOne: false,
      },
    },
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
export class TestComboSchema extends BaseSchema {
  @Prop({ required: true })
  displayIndex: number

  @Prop({ required: true })
  name: string

  @Prop({ required: true, type: [Types.ObjectId] })
  testIds: string[]
  tests?: (TestSchema | null)[]

  @Prop({ required: true, type: Types.ObjectId })
  branchId: string
  branch?: BranchSchema | null
}
