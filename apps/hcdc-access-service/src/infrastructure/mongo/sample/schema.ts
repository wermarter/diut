import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { BaseSchema, baseSchemaOptions } from '@diut/nest-core'
import { Types } from 'mongoose'

import { COLLECTION } from '../collections'
import { BranchSchema } from '../branch'
import { SampleTypeSchema } from '../sample-type'
import { TestElementSchema } from '../test-element'
import { TestSchema } from '../test'
import { UserSchema } from '../user'
import { PatientSchema } from '../patient'
import { DoctorSchema } from '../doctor'
import { PatientTypeSchema } from '../patient-type'
import { DiagnosisSchema } from '../diagnosis'

@Schema({
  virtuals: {
    testElement: {
      options: {
        ref: TestElementSchema.name,
        localField: 'testElementId',
        foreignField: '_id',
        justOne: true,
      },
    },
  },
})
export class SampleResultTestElementSchema {
  @Prop({ required: true, type: Types.ObjectId })
  testElementId: string
  testElement?: TestElementSchema | null

  @Prop({ required: true })
  value: string

  @Prop({ required: true })
  isAbnormal: boolean
}

@Schema({
  virtuals: {
    test: {
      options: {
        ref: TestSchema.name,
        localField: 'testId',
        foreignField: '_id',
        justOne: true,
      },
    },
    resultBy: {
      options: {
        ref: UserSchema.name,
        localField: 'resultById',
        foreignField: '_id',
        justOne: true,
      },
    },
  },
})
export class SampleResultTestSchema {
  @Prop({ required: true, type: Types.ObjectId })
  testId: string
  test?: TestSchema | null

  @Prop({ required: true })
  isLocked: boolean

  @Prop({ required: false })
  resultById?: string
  resultBy?: UserSchema | null

  @Prop({ required: false })
  resultAt?: Date

  @Prop({ required: false })
  bioProductName?: string

  @Prop({ required: false })
  instrumentName?: string

  @Prop({
    required: true,
    type: [SchemaFactory.createForClass(SampleResultTestElementSchema)],
  })
  elements: SampleResultTestElementSchema[]
}

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.SAMPLE,
  virtuals: {
    sampleTypes: {
      options: {
        ref: SampleTypeSchema.name,
        localField: 'sampleTypeIds',
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
    infoBy: {
      options: {
        ref: UserSchema.name,
        localField: 'infoById',
        foreignField: '_id',
        justOne: true,
      },
    },
    printedBy: {
      options: {
        ref: UserSchema.name,
        localField: 'printedById',
        foreignField: '_id',
        justOne: true,
      },
    },
    patient: {
      options: {
        ref: PatientSchema.name,
        localField: 'patientId',
        foreignField: '_id',
        justOne: true,
      },
    },
    doctor: {
      options: {
        ref: DoctorSchema.name,
        localField: 'doctorId',
        foreignField: '_id',
        justOne: true,
      },
    },
    patientType: {
      options: {
        ref: PatientTypeSchema.name,
        localField: 'patientTypeId',
        foreignField: '_id',
        justOne: true,
      },
    },
    diagnosis: {
      options: {
        ref: DiagnosisSchema.name,
        localField: 'diagnosisId',
        foreignField: '_id',
        justOne: true,
      },
    },
    origin: {
      options: {
        ref: BranchSchema.name,
        localField: 'originId',
        foreignField: '_id',
        justOne: true,
      },
    },
  },
})
export class SampleSchema extends BaseSchema {
  @Prop({ required: true })
  sampleId: string

  @Prop({ required: true })
  note: string

  @Prop({ required: true })
  isNgoaiGio: boolean

  @Prop({ required: true })
  isTraBuuDien: boolean

  @Prop({ required: true })
  isConfirmed: boolean

  @Prop({ required: true })
  infoAt: Date

  @Prop({ required: true })
  sampledAt: Date

  @Prop({ required: true })
  sampleCompleted: boolean

  @Prop({ required: false })
  printedAt?: Date

  @Prop({
    required: true,
    type: [SchemaFactory.createForClass(SampleResultTestSchema)],
  })
  results: SampleResultTestSchema[]

  @Prop({ required: true, type: Types.ObjectId })
  infoById: string
  infoBy?: UserSchema | null

  @Prop({ required: true, type: Types.ObjectId })
  printedById: string
  printedBy?: UserSchema | null

  @Prop({ required: true, type: Types.ObjectId })
  patientId: string
  patient?: PatientSchema | null

  @Prop({ required: true, type: Types.ObjectId })
  doctorId: string
  doctor?: DoctorSchema | null

  @Prop({ required: true, type: Types.ObjectId })
  patientTypeId: string
  patientType?: PatientTypeSchema | null

  @Prop({ required: true, type: Types.ObjectId })
  diagnosisId: string
  diagnosis?: DiagnosisSchema | null

  @Prop({ required: true, type: Types.ObjectId })
  originId: string
  origin?: BranchSchema | null

  @Prop({ required: true, type: [Types.ObjectId] })
  sampleTypeIds: string[]
  sampleTypes?: (SampleTypeSchema | null)[]

  @Prop({ required: true, type: Types.ObjectId })
  branchId: string
  branch?: BranchSchema | null
}
