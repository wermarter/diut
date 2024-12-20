import { stringEnumValues } from '@diut/common'
import {
  BioProductAction,
  BranchAction,
  DiagnosisAction,
  DoctorAction,
  ExternalRouteAction,
  InstrumentAction,
  PatientAction,
  PatientTypeAction,
  PrintFormAction,
  ReportAction,
  RoleAction,
  SampleAction,
  SampleTestResultAction,
  SampleTypeAction,
  TestAction,
  TestCategoryAction,
  TestComboAction,
  TestElementAction,
  UserAction,
} from '../entity'
import { AUTH_ACTION_ALL } from './constants'
import { AuthSubject, AuthSubjectUnionType } from './subject'

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
  SampleTestResult: stringEnumValues(SampleTestResultAction),
  TestElement: stringEnumValues(TestElementAction),
  Patient: stringEnumValues(PatientAction),
  TestCombo: stringEnumValues(TestComboAction),
  Sample: stringEnumValues(SampleAction),
  Report: stringEnumValues(ReportAction),
  ExternalRoute: stringEnumValues(ExternalRouteAction),
} satisfies Record<keyof typeof AuthSubject, string[]>

export const AuthActionValues = [
  ...new Set(Object.values(AuthAction).flat()),
  AUTH_ACTION_ALL,
]

export type AuthActionUnionType =
  | (typeof AuthAction)[AuthSubjectUnionType][number]
  | typeof AUTH_ACTION_ALL
