import { AssertAllKeysInArray } from '@diut/common'

import { BaseEntity, baseEntityKeys } from '../base-entity'
import { Branch } from '../branch'
import { Diagnosis } from '../diagnosis'
import { Doctor } from '../doctor'
import { Patient } from '../patient'
import { PatientType } from '../patient-type'
import { SampleType } from '../sample-type'
import { Test } from '../test'
import { TestElement } from '../test-element'
import { User } from '../user'

export type SampleResultTestElement = {
  testElementId: string
  testElement?: TestElement | null
  value: string
  isAbnormal: boolean
}

export type SampleResultTest = {
  testId: string
  test?: Test | null
  isLocked: boolean
  resultById?: string
  resultBy?: User | null
  resultAt?: Date

  bioProductName?: string
  instrumentName?: string

  elements: SampleResultTestElement[]
}

export type Sample = BaseEntity & {
  billId: string
  sampleId: string
  note: string
  isNgoaiGio: boolean
  isTraBuuDien: boolean
  isConfirmed: boolean
  infoAt: Date
  sampledAt: Date
  printedAt?: Date
  sampleCompleted: boolean
  isPregnant: boolean

  results: SampleResultTest[]

  infoById: string
  infoBy?: User | null

  printedById?: string
  printedBy?: User | null

  patientId: string
  patient?: Patient | null

  doctorId: string
  doctor?: Doctor | null

  patientTypeId: string
  patientType?: PatientType | null

  diagnosisId: string
  diagnosis?: Diagnosis | null

  originId: string
  origin?: Branch | null

  sampleTypeIds: string[]
  sampleTypes?: (SampleType | null)[]

  branchId: string
  branch?: Branch | null
}

export const sampleInfoFieldNames = [
  'sampleId',
  'billId',
  'note',
  'isPregnant',
  'isNgoaiGio',
  'isTraBuuDien',
  'infoAt',
  'sampledAt',
  'patientId',
  'doctorId',
  'patientTypeId',
  'diagnosisId',
  'originId',
  'sampleTypeIds',
  'branchId',
] satisfies (keyof Sample)[]

export type SampleInfo = Pick<Sample, (typeof sampleInfoFieldNames)[number]>

export type SampleResult = Pick<Sample, 'results'>

export enum SampleAction {
  Create = 'Create',
  Read = 'Read',
  ReadInfo = 'ReadInfo',
  ReadResult = 'ReadResult',
  Update = 'Update',
  UpdateInfo = 'UpdateInfo',
  UpdateResult = 'UpdateResult',
  Delete = 'Delete',
  PrintResult = 'PrintResult',
  GeneratePrintUrl = 'GeneratePrintUrl',
}

export const SampleFields = [
  ...baseEntityKeys,
  ...sampleInfoFieldNames,
  'results',
  'infoById',
  'infoBy',
  'printedById',
  'printedBy',
  'patient',
  'doctor',
  'patientType',
  'diagnosis',
  'origin',
  'sampleTypes',
  'branch',
  'printedAt',
  'sampleCompleted',
  'isConfirmed',
] satisfies (keyof Sample)[]

true satisfies AssertAllKeysInArray<typeof SampleFields, Sample>
