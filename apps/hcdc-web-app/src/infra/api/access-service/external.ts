import { accessServiceApiSlice as api } from './slice'
export const addTagTypes = ['external'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      externalPrintSampleResult: build.query<
        ExternalPrintSampleResultApiResponse,
        ExternalPrintSampleResultApiArg
      >({
        query: (queryArg) => ({
          url: `/api/external/print-sample-result`,
          params: { jwt: queryArg },
        }),
        providesTags: ['external'],
      }),
      externalGetSampleResult: build.query<
        ExternalGetSampleResultApiResponse,
        ExternalGetSampleResultApiArg
      >({
        query: (queryArg) => ({
          url: `/api/external/get-sample-result`,
          params: { jwt: queryArg },
        }),
        providesTags: ['external'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as externalApi }
export type ExternalPrintSampleResultApiResponse = unknown
export type ExternalPrintSampleResultApiArg = string
export type ExternalGetSampleResultApiResponse =
  /** status 200 Get sample result */ ExternalGetSampleResultResponseDto
export type ExternalGetSampleResultApiArg = string
export type TestElementNormalRuleDto = {
  category:
    | 'Any'
    | 'YoungMale'
    | 'YoungFemale'
    | 'MatureMale'
    | 'MatureFemale'
    | 'Pregnant'
  defaultChecked?: boolean
  normalValue?: string
  normalLowerBound?: number
  normalUpperBound?: number
  description: string
  note: string
}
export type TestElementUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  printIndex: number
  reportIndex: number
  unit: string
  isParent: boolean
  normalRules: TestElementNormalRuleDto[]
  testId: string
  branchId: string
}
export type SampleResultTestElementResponseDto = {
  testElementId: string
  value: string
  isAbnormal: boolean
  testElement?: TestElementUnpopulatedResponseDto | null
}
export type TestUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  shouldDisplayWithChildren: boolean
  bioProductId: string | null
  instrumentId: string | null
  sampleTypeId: string | null
  testCategoryId: string
  printFormIds: string[]
  branchId: string
}
export type PermissionRuleDto = {
  subject:
    | 'Branch'
    | 'Role'
    | 'User'
    | 'PrintForm'
    | 'BioProduct'
    | 'Instrument'
    | 'SampleType'
    | 'Doctor'
    | 'PatientType'
    | 'Diagnosis'
    | 'TestCategory'
    | 'TestElement'
    | 'Test'
    | 'TestCombo'
    | 'Patient'
    | 'Sample'
    | 'SampleTestResult'
    | 'Report'
    | 'ExternalRoute'
    | 'all'
  action:
    | 'Create'
    | 'Read'
    | 'Update'
    | 'Delete'
    | 'AuthorizeUser'
    | 'DeauthorizeUser'
    | 'AssignToUser'
    | 'AssignUserInline'
    | 'ChangePassword'
    | 'OverrideAuthor'
    | 'Modify'
    | 'ReadInfo'
    | 'ReadResult'
    | 'UpdateInfo'
    | 'UpdateResult'
    | 'PrintResult'
    | 'Lock'
    | 'View'
    | 'Export'
    | 'Generate'
    | 'manage'
  inverted?: boolean
  conditions: object
  fields?: any[]
}
export type UserUnpopulatedResponseDto = {
  _id: string
  username: string
  name: string
  phoneNumber: string
  inlinePermissions: PermissionRuleDto[]
  branchIds: string[]
  roleIds: string[]
}
export type SampleResultTestResponseDto = {
  testId: string
  isLocked: boolean
  elements: SampleResultTestElementResponseDto[]
  test?: TestUnpopulatedResponseDto | null
  resultById?: string
  resultBy?: UserUnpopulatedResponseDto | null
  resultAt?: string
  bioProductName?: string
  instrumentName?: string
}
export type PublicPatientResponseDto = {
  _id: string
  name: string
}
export type PublicSampleResponseDto = {
  _id: string
  sampleId: string
  isPregnant: boolean
  branchId: string
  results: SampleResultTestResponseDto[]
  patient: PublicPatientResponseDto
}
export type PublicPrintFormResponseDto = {
  _id: string
  template: 'FormChung' | 'FormHIV' | 'FormPap' | 'FormSoiNhuom' | 'FormTD'
}
export type ExternalGetSampleResultResponseDto = {
  sample: PublicSampleResponseDto
  printForms: PublicPrintFormResponseDto[]
}
export const {
  useExternalPrintSampleResultQuery,
  useLazyExternalPrintSampleResultQuery,
  useExternalGetSampleResultQuery,
  useLazyExternalGetSampleResultQuery,
} = injectedRtkApi
