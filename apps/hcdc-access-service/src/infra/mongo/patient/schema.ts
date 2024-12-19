import { PatientGender, PatientGenderValues } from '@diut/hcdc'
import { BaseSchema, baseSchemaOptions } from '@diut/nestjs-infra'
import { Prop, Schema } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { BranchSchema } from '../branch'
import { COLLECTION } from '../collections'

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
  @Prop({ required: false })
  externalId: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true, enum: PatientGenderValues })
  gender: PatientGender

  @Prop({ required: true })
  birthYear: number

  @Prop({ required: false })
  address: string

  @Prop({ required: false })
  phoneNumber: string

  @Prop({ required: false })
  SSN: string

  @Prop({ required: true, type: Types.ObjectId })
  branchId: string
  branch?: BranchSchema | null
}
