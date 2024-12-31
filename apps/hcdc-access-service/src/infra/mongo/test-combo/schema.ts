import { BaseSchema, baseSchemaOptions } from '@diut/nestjs-infra'
import { Prop, Schema } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { BranchSchema } from '../branch'
import { COLLECTION } from '../collections'
import { TestSchema } from '../test/schema'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.TEST_COMBO,
  virtuals: {
    tests: {
      options: {
        ref: 'TestSchema',
        localField: 'testIds',
        foreignField: '_id',
        justOne: false,
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
export class TestComboSchema extends BaseSchema {
  @Prop({ required: true })
  displayIndex: number

  @Prop({ required: true })
  name: string

  @Prop({ required: true, type: [Types.ObjectId] })
  testIds: string[]
  tests?: TestSchema[]

  @Prop({ required: true, type: Types.ObjectId })
  branchId: string
  branch?: BranchSchema
}
