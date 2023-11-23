import { Prop, Schema } from '@nestjs/mongoose'
import { Schema as MongooseSchema, Types } from 'mongoose'

import { BaseSchema, baseSchemaOptions } from '@diut/server-core'
import { COLLECTION } from 'src/common/collections'
import { Doctor } from '../doctors/doctor.schema'
import { Indication } from '../indications/indication.schema'
import { PatientType } from '../patient-types/patient-type.schema'
import { Patient } from '../patients/patient.schema'
import { SampleType } from '../sample-types/sample-type.schema'
import { User } from '../users/user.schema'
import { SampleOrigin } from '../sample-origins/sample-origin.schema'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.SAMPLE,
})
export class Sample extends BaseSchema {
  @Prop({ required: true, unique: true })
  sampleId: string

  @Prop({ required: true })
  sampledAt: Date

  @Prop({ required: true })
  infoAt: Date

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    index: true,
    required: true,
  })
  infoBy: string | User

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: Patient.name,
  })
  patientId: string | Patient

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: Doctor.name,
  })
  doctorId: string | Doctor

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: PatientType.name,
  })
  patientTypeId: string | PatientType

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: Indication.name,
  })
  indicationId: string | Indication

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: SampleOrigin.name,
  })
  sampleOriginId: string | SampleOrigin

  @Prop({
    required: true,
    type: [
      {
        type: Types.ObjectId,
        ref: SampleType.name,
      },
    ],
  })
  sampleTypeIds: string[] | SampleType[]

  @Prop({ required: true, type: [MongooseSchema.Types.Mixed] })
  results: Array<{
    testId: string
    testCompleted: boolean
    bioProductName?: string
    resultBy?: string
    resultAt?: Date

    elements: Array<{
      id: string
      value: string
      isHighlighted: boolean
    }>
  }>

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: User.name,
      },
    ],
    index: true,
    required: true,
  })
  resultBy: string[] | User[]

  @Prop({ required: true })
  infoCompleted: boolean

  @Prop({ required: true })
  sampleCompleted: boolean

  @Prop({ required: true })
  isTraBuuDien: boolean

  @Prop({ required: true })
  isNgoaiGio: boolean

  @Prop()
  note?: string

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
  })
  printedBy?: string | User

  @Prop()
  printedAt?: Date
}
