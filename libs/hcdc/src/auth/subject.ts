import {
  BioProduct,
  Branch,
  Diagnosis,
  Doctor,
  Instrument,
  Patient,
  PatientType,
  PrintForm,
  Role,
  Sample,
  SampleResultTest,
  SampleType,
  Test,
  TestCategory,
  TestCombo,
  TestElement,
  User,
  WebApp,
} from '../entity'
import { AUTH_SUBJECT_ALL } from './constants'

// key-value must be identical for working with '@casl/mongoose'.accessibleBy()
export const AuthSubject = {
  BioProduct: 'BioProduct',
  TestCategory: 'TestCategory',
  Branch: 'Branch',
  Role: 'Role',
  User: 'User',
  Instrument: 'Instrument',
  SampleType: 'SampleType',
  Doctor: 'Doctor',
  PatientType: 'PatientType',
  Diagnosis: 'Diagnosis',
  PrintForm: 'PrintForm',
  Test: 'Test',
  TestResult: 'TestResult',
  TestElement: 'TestElement',
  Patient: 'Patient',
  TestCombo: 'TestCombo',
  Sample: 'Sample',
  WebApp: 'WebApp',
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
  TestResult: SampleResultTest
  TestElement: TestElement
  Patient: Patient
  TestCombo: TestCombo
  Sample: Sample
  WebApp: WebApp
}
