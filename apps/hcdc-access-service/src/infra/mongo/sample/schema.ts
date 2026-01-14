import { BaseSchema, baseSchemaOptions } from '@diut/nestjs-infra'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { BranchSchema } from '../branch'
import { COLLECTION } from '../collections'
import { DiagnosisSchema } from '../diagnosis'
import { DoctorSchema } from '../doctor'
import { PatientSchema } from '../patient'
import { PatientTypeSchema } from '../patient-type'
import { SampleTypeSchema } from '../sample-type'
import { TestSchema } from '../test'
import { TestElementSchema } from '../test-element'
import { UserSchema } from '../user'

@Schema({
  _id: false,
  virtuals: {
    testElement: {
      options: {
        ref: 'TestElementSchema',
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

  // The required validator will fail for empty strings.
  @Prop({ required: false, type: String })
  value: string

  @Prop({ required: true, type: Boolean })
  isAbnormal: boolean
}

@Schema({
  _id: false,
  virtuals: {
    test: {
      options: {
        ref: 'TestSchema',
        localField: 'testId',
        foreignField: '_id',
        justOne: true,
      },
    },
    resultBy: {
      options: {
        ref: 'UserSchema',
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

  @Prop({ required: true, type: Boolean })
  isLocked: boolean

  @Prop({ required: false, type: String })
  resultById?: string
  resultBy?: UserSchema | null

  @Prop({ required: false, type: Date })
  resultAt?: Date

  @Prop({ required: false, type: String })
  bioProductName?: string

  @Prop({ required: false, type: String })
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
        ref: 'SampleTypeSchema',
        localField: 'sampleTypeIds',
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
    infoBy: {
      options: {
        ref: 'UserSchema',
        localField: 'infoById',
        foreignField: '_id',
        justOne: true,
      },
    },
    printedBy: {
      options: {
        ref: 'UserSchema',
        localField: 'printedById',
        foreignField: '_id',
        justOne: true,
      },
    },
    patient: {
      options: {
        ref: 'PatientSchema',
        localField: 'patientId',
        foreignField: '_id',
        justOne: true,
      },
    },
    doctor: {
      options: {
        ref: 'DoctorSchema',
        localField: 'doctorId',
        foreignField: '_id',
        justOne: true,
      },
    },
    patientType: {
      options: {
        ref: 'PatientTypeSchema',
        localField: 'patientTypeId',
        foreignField: '_id',
        justOne: true,
      },
    },
    diagnosis: {
      options: {
        ref: 'DiagnosisSchema',
        localField: 'diagnosisId',
        foreignField: '_id',
        justOne: true,
      },
    },
    origin: {
      options: {
        ref: 'BranchSchema',
        localField: 'originId',
        foreignField: '_id',
        justOne: true,
      },
    },
  },
})
export class SampleSchema extends BaseSchema {
  @Prop({ required: true, type: String })
  sampleId: string

  @Prop({ required: false, type: String })
  billId: string

  @Prop({ required: false, type: String })
  note: string

  @Prop({ required: true, type: Boolean })
  isNgoaiGio: boolean

  @Prop({ required: true, type: Boolean })
  isTraBuuDien: boolean

  @Prop({ required: true, type: Boolean })
  isConfirmed: boolean

  @Prop({ required: true, type: Boolean })
  isLocked: boolean

  @Prop({ required: true, type: Date })
  infoAt: Date

  @Prop({ required: true, type: Date })
  sampledAt: Date

  @Prop({ required: true, type: Boolean })
  sampleCompleted: boolean

  @Prop({ required: true, type: Boolean })
  isPregnant: boolean

  @Prop({ required: false, type: Date })
  printedAt?: Date

  @Prop({
    required: true,
    type: [SchemaFactory.createForClass(SampleResultTestSchema)],
  })
  results: SampleResultTestSchema[]

  @Prop({ required: true, type: Types.ObjectId })
  infoById: string
  infoBy?: UserSchema | null

  @Prop({ required: false, type: Types.ObjectId })
  printedById?: string
  printedBy?: UserSchema | null

  @Prop({ required: true, type: Types.ObjectId })
  patientId: string
  patient?: PatientSchema

  @Prop({ required: true, type: Types.ObjectId })
  doctorId: string
  doctor?: DoctorSchema

  @Prop({ required: true, type: Types.ObjectId })
  patientTypeId: string
  patientType?: PatientTypeSchema

  @Prop({ required: true, type: Types.ObjectId })
  diagnosisId: string
  diagnosis?: DiagnosisSchema

  @Prop({ required: true, type: Types.ObjectId })
  originId: string
  origin?: BranchSchema

  @Prop({ required: true, type: [Types.ObjectId] })
  sampleTypeIds: string[]
  sampleTypes?: SampleTypeSchema[]

  @Prop({ required: true, type: Types.ObjectId })
  branchId: string
  branch?: BranchSchema
}
