import { AssertAllKeysInArray, stringEnumValues } from '@diut/common'
import { BaseEntity, baseEntityKeys } from '../base-entity'
import { Branch } from '../branch'

export enum PatientGender {
  Male = 'Male',
  Female = 'Female',
}

export enum PatientCategory {
  Any = 'Any',
  YoungMale = 'YoungMale',
  YoungFemale = 'YoungFemale',
  MatureMale = 'MatureMale',
  MatureFemale = 'MatureFemale',
  Pregnant = 'Pregnant',
}

export const PatientGenderValues = stringEnumValues(PatientGender)
export const PatientCategoryValues = stringEnumValues(PatientCategory)

export type Patient = BaseEntity & {
  externalId: string
  name: string
  gender: PatientGender
  birthYear: number
  address: string
  phoneNumber: string
  SSN: string

  branchId: string
  branch?: Branch
}

export enum PatientAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

export const PatientFields = [
  ...baseEntityKeys,
  'externalId',
  'name',
  'gender',
  'birthYear',
  'address',
  'phoneNumber',
  'SSN',
  'branchId',
  'branch',
] satisfies (keyof Patient)[]

true satisfies AssertAllKeysInArray<typeof PatientFields, Patient>
