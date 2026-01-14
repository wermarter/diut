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
  @Prop({ required: false, type: String })
  externalId: string

  @Prop({ required: true, type: String })
  name: string

  @Prop({ required: true, enum: PatientGenderValues, type: String })
  gender: PatientGender

  @Prop({ required: true, type: Number })
  birthYear: number

  @Prop({ required: false, type: String })
  address: string

  @Prop({ required: false, type: String })
  phoneNumber: string

  @Prop({ required: false, type: String })
  SSN: string

  @Prop({ required: true, type: Types.ObjectId })
  branchId: string
  branch?: BranchSchema
}
