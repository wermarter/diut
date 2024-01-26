import { stringEnumValues } from '@diut/common'

import { AuthSubject, AuthSubjectUnionType } from './subject'
import {
  BioProductAction,
  BranchAction,
  DiagnosisAction,
  DoctorAction,
  InstrumentAction,
  PatientTypeAction,
  PrintFormAction,
  RoleAction,
  SampleTypeAction,
  TestAction,
  TestCategoryAction,
  UserAction,
} from '../entity'
import { AUTH_ACTION_ALL } from './constants'

export const AuthAction = {
  BioProduct: stringEnumValues(BioProductAction),
  TestCategory: stringEnumValues(TestCategoryAction),
  Branch: stringEnumValues(BranchAction),
  Role: stringEnumValues(RoleAction),
  User: stringEnumValues(UserAction),
  Instrument: stringEnumValues(InstrumentAction),
  SampleType: stringEnumValues(SampleTypeAction),
  Doctor: stringEnumValues(DoctorAction),
  PatientType: stringEnumValues(PatientTypeAction),
  Diagnosis: stringEnumValues(DiagnosisAction),
  PrintForm: stringEnumValues(PrintFormAction),
  Test: stringEnumValues(TestAction),
} satisfies Record<keyof typeof AuthSubject, string[]>

export const AuthActionValues = [
  ...new Set(Object.values(AuthAction).flat()),
  AUTH_ACTION_ALL,
]

export type AuthActionUnionType =
  (typeof AuthAction)[AuthSubjectUnionType][number]
