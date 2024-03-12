import { stringEnumValues } from '@diut/common'

import { AuthSubject, AuthSubjectUnionType } from './subject'
import {
  BioProductAction,
  BranchAction,
  DiagnosisAction,
  DoctorAction,
  InstrumentAction,
  PatientAction,
  PatientTypeAction,
  PrintFormAction,
  RoleAction,
  SampleAction,
  SampleTypeAction,
  TestAction,
  TestCategoryAction,
  TestComboAction,
  TestElementAction,
  TestResultAction,
  UserAction,
  WebAppAction,
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
  TestResult: stringEnumValues(TestResultAction),
  TestElement: stringEnumValues(TestElementAction),
  Patient: stringEnumValues(PatientAction),
  TestCombo: stringEnumValues(TestComboAction),
  Sample: stringEnumValues(SampleAction),
  WebApp: stringEnumValues(WebAppAction),
} satisfies Record<keyof typeof AuthSubject, string[]>

export const AuthActionValues = [
  ...new Set(Object.values(AuthAction).flat()),
  AUTH_ACTION_ALL,
]

export type AuthActionUnionType =
  | (typeof AuthAction)[AuthSubjectUnionType][number]
  | typeof AUTH_ACTION_ALL
