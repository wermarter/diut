import {
  BioProduct,
  BioProductFields,
  Branch,
  BranchFields,
  Diagnosis,
  DiagnosisFields,
  Doctor,
  DoctorFields,
  Instrument,
  InstrumentFields,
  Patient,
  PatientFields,
  PatientType,
  PatientTypeFields,
  PrintForm,
  PrintFormFields,
  Report,
  ReportFields,
  Role,
  RoleFields,
  Sample,
  SampleFields,
  SampleTestResult,
  SampleTestResultFields,
  SampleType,
  SampleTypeFields,
  Test,
  TestCategory,
  TestCategoryFields,
  TestCombo,
  TestComboFields,
  TestElement,
  TestElementFields,
  TestFields,
  User,
  UserFields,
} from '../entity'
import { AUTH_SUBJECT_ALL } from './constants'

// key-value must be identical for working with '@casl/mongoose'.accessibleBy()
export const AuthSubject = {
  Branch: 'Branch',
  Role: 'Role',
  User: 'User',

  PrintForm: 'PrintForm',
  BioProduct: 'BioProduct',
  Instrument: 'Instrument',
  SampleType: 'SampleType',
  Doctor: 'Doctor',
  PatientType: 'PatientType',
  Diagnosis: 'Diagnosis',

  TestCategory: 'TestCategory',
  TestElement: 'TestElement',
  Test: 'Test',
  TestCombo: 'TestCombo',

  Patient: 'Patient',
  Sample: 'Sample',
  SampleTestResult: 'SampleTestResult',
  Report: 'Report',
} as const

export type AuthSubjectUnionType = keyof typeof AuthSubject

export const AuthSubjectValues = [
  ...Object.keys(AuthSubject),
  AUTH_SUBJECT_ALL,
] as AuthSubjectUnionType[]

export type SubjectEntityMapping = {
  BioProduct: BioProduct
  TestCategory: TestCategory
  Branch: Branch
  Role: Role
  User: User
  Instrument: Instrument
  SampleType: SampleType
  Doctor: Doctor
  PatientType: PatientType
  Diagnosis: Diagnosis
  PrintForm: PrintForm
  Test: Test
  SampleTestResult: SampleTestResult
  TestElement: TestElement
  Patient: Patient
  TestCombo: TestCombo
  Sample: Sample
  Report: Report
}

export const subjectFieldsMapping = {
  BioProduct: BioProductFields,
  Branch: BranchFields,
  Diagnosis: DiagnosisFields,
  Doctor: DoctorFields,
  Instrument: InstrumentFields,
  Patient: PatientFields,
  PatientType: PatientTypeFields,
  PrintForm: PrintFormFields,
  Report: ReportFields,
  Role: RoleFields,
  Sample: SampleFields,
  SampleTestResult: SampleTestResultFields,
  SampleType: SampleTypeFields,
  Test: TestFields,
  TestCategory: TestCategoryFields,
  TestCombo: TestComboFields,
  TestElement: TestElementFields,
  User: UserFields,
} satisfies {
  [key in AuthSubjectUnionType]: string[]
}
