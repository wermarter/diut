import { BaseSchema, baseSchemaOptions } from '@diut/nestjs-infra'
import { Prop, Schema } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { BranchSchema } from '../branch'
import { COLLECTION } from '../collections'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.PATIENT_TYPE,
  virtuals: {
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
export class PatientTypeSchema extends BaseSchema {
  @Prop({ required: true })
  displayIndex: number

  @Prop({ required: true })
  name: string

  @Prop({ required: true, type: Types.ObjectId })
  branchId: string
  branch?: BranchSchema
}
