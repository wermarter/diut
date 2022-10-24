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
  @Prop({ required: true })
  sampleId: string

  @Prop({ required: true })
  sampledAt: Date

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    index: true,
    required: true,
  })
  createdBy: string | User

  @Prop({
    required: true,
    type: MongooseSchema.Types.Mixed,
  })
  patient: Patient

  @Prop({
    required: true,
    type: MongooseSchema.Types.Mixed,
  })
  doctor: Doctor

  @Prop({
    required: true,
    type: MongooseSchema.Types.Mixed,
  })
  patientType: PatientType

  @Prop({
    required: true,
    type: MongooseSchema.Types.Mixed,
  })
  indication: Indication

  @Prop({
    required: true,
    type: [MongooseSchema.Types.Mixed],
  })
  sampleTypes: SampleType[]

  @Prop({ required: true, type: [MongooseSchema.Types.Mixed] })
  results: {
    id: string

    testName: string
    category: string
    bioProduct: string
    resultBy?: string

    elements: {
      id: string

      name: string
      unit: string
      description: string
      normalValue?: string

      value: string
      isHighlighted: boolean
    }[]
  }[]

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
  isCompleted: boolean
}
