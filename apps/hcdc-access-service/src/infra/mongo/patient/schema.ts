import { Prop, Schema } from '@nestjs/mongoose'
import { BaseSchema, baseSchemaOptions } from '@diut/nestjs-infra'
import { Types } from 'mongoose'
import { PatientGender, PatientGenderValues } from '@diut/hcdc'

import { COLLECTION } from '../collections'
import { BranchSchema } from '../branch'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.PATIENT,
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
export class PatientSchema extends BaseSchema {
  @Prop({ required: true })
  externalId: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true, enum: PatientGenderValues })
  gender: PatientGender

  @Prop({ required: true })
  birthYear: number

  @Prop({ required: true })
  address: string

  @Prop({ required: true })
  phoneNumber: string

  @Prop({ required: true })
  SSN: string

  @Prop({ required: true, type: Types.ObjectId })
  branchId: string
  branch?: BranchSchema | null
}
