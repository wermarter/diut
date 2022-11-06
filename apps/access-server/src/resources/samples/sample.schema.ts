import { Prop, Schema } from '@nestjs/mongoose'
import { Schema as MongooseSchema, Types } from 'mongoose'

import { BaseSchema, baseSchemaOptions } from 'src/clients/mongo'
import { COLLECTION } from 'src/common/collections'
import { Doctor } from '../doctors'
import { Indication } from '../indications'
import { PatientType } from '../patient-types'
import { Patient } from '../patients'
import { SampleType } from '../sample-types'
import { User } from '../users'

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
}
