import { accessServiceApiSlice as api } from './slice'
export const addTagTypes = ['v1-reports'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      reportQuerySoNhanMau: build.query<
        ReportQuerySoNhanMauApiResponse,
        ReportQuerySoNhanMauApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/reports/so-nhan-mau`,
          method: 'POST',
          body: queryArg,
        }),
        providesTags: ['v1-reports'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as reportApi }
export type ReportQuerySoNhanMauApiResponse =
  /** status 200  */ ReportQuerySoNhanMauResponseDto
export type ReportQuerySoNhanMauApiArg = ReportQuerySoNhanMauRequestDto
export type PermissionRuleRequestDto = {
  subject:
    | 'BioProduct'
    | 'TestCategory'
    | 'Branch'
    | 'Role'
    | 'User'
    | 'Instrument'
    | 'SampleType'
    | 'Doctor'
    | 'PatientType'
    | 'Diagnosis'
    | 'PrintForm'
    | 'Test'
    | 'TestResult'
    | 'TestElement'
    | 'Patient'
    | 'TestCombo'
    | 'Sample'
    | 'WebApp'
    | 'all'
  action:
    | 'Create'
    | 'Read'
    | 'Update'
    | 'Delete'
    | 'AssignToUser'
    | 'AssignUserInline'
    | 'ChangePassword'
    | 'OverrideAuthor'
    | 'Modify'
    | 'UpdateInfo'
    | 'UpdateResult'
    | 'PrintResult'
    | 'ExportReport'
    | 'View'
    | 'manage'
  inverted?: boolean
  conditions: object
}
export type UserUnpopulatedResponseDto = {
  _id: string
  username: string
  name: string
  phoneNumber: string
  inlinePermissions: PermissionRuleRequestDto[]
  branchIds: string[]
  roleIds: string[]
}
export type PatientUnpopulatedResponseDto = {
  _id: string
  externalId: string
  name: string
  gender: 'Male' | 'Female'
  birthYear: number
  address: string
  phoneNumber: string
  SSN: string
  branchId: string
}
export type DoctorUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  branchId: string
}
export type PatientTypeUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  branchId: string
}
export type DiagnosisUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  branchId: string
}
export type BranchUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  address: string
  type: 'Internal' | 'External'
  sampleOriginIds: string[]
}
export type SampleTypeUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  branchId: string
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
  printFormId: string | null
  branchId: string
}
export type OmittedTestResponseDto = {
  testId: string
  isLocked: boolean
  test?: TestUnpopulatedResponseDto | null
  resultById?: string
  resultBy?: UserUnpopulatedResponseDto | null
  resultAt?: string
  bioProductName?: string
  instrumentName?: string
}
export type OmittedSampleResponseDto = {
  _id: string
  sampleId: string
  note: string
  isNgoaiGio: boolean
  isTraBuuDien: boolean
  isPregnant: boolean
  infoAt: string
  sampledAt: string
  patientId: string
  doctorId: string
  patientTypeId: string
  diagnosisId: string
  originId: string
  sampleTypeIds: string[]
  branchId: string
  isConfirmed: boolean
  sampleCompleted: boolean
  printedAt?: string
  infoById: string
  printedById?: string
  infoBy?: UserUnpopulatedResponseDto | null
  printedBy?: UserUnpopulatedResponseDto | null
  patient?: PatientUnpopulatedResponseDto | null
  doctor?: DoctorUnpopulatedResponseDto | null
  patientType?: PatientTypeUnpopulatedResponseDto | null
  diagnosis?: DiagnosisUnpopulatedResponseDto | null
  origin?: BranchUnpopulatedResponseDto | null
  sampleTypes?: SampleTypeUnpopulatedResponseDto[]
  branch?: BranchUnpopulatedResponseDto | null
  results: OmittedTestResponseDto[]
}
export type ReportQuerySoNhanMauSummaryResponseDto = {
  test: object
  isTraBuuDien?: number
  isNgoaiGio?: number
}
export type ReportQuerySoNhanMauResponseDto = {
  total: number
  offset: number
  limit: number
  items: OmittedSampleResponseDto[]
  summary: ReportQuerySoNhanMauSummaryResponseDto
}
export type HttpErrorResponse = {
  errorCode:
    | 'UNKNOWN'
    | 'AUTHN'
    | 'AUTHN_JWT_INVALID_TOKEN'
    | 'AUTHN_LOGIN_INVALID_USERNAME'
    | 'AUTHN_LOGIN_INVALID_PASSWORD'
    | 'AUTHN_COOKIE_ACCESS_TOKEN_NOT_FOUND'
    | 'AUTHN_PAYLOAD_NOT_FOUND'
    | 'AUTHN_PAYLOAD_USER_NOT_FOUND'
    | 'AUTHZ'
    | 'AUTHZ_AUTHENTICATION_REQUIRED'
    | 'AUTHZ_PERMISSION_DENIED'
    | 'ENTITY'
    | 'ENTITY_NOT_FOUND'
    | 'ENTITY_CANNOT_DELETE'
    | 'ENTITY_POPULATE_PATH_UNKNOWN'
    | 'ENTITY_SAMPLE_ID_ALREADY_EXISTS'
    | 'ENTITY_TEST_INVALID_BIO_PRODUCT'
    | 'EXTERNAL_SERVICE'
    | 'BROWSER_SERVICE'
    | 'BROWSER_SERVICE_EXCEPTION'
    | 'REQUEST'
    | 'REQUEST_INVALID_INPUT'
  message: string
}
export type ReportQuerySoNhanMauRequestDto = {
  offset?: number
  limit?: number
  fromDate: string
  toDate: string
  branchId: string
  isNgoaiGio?: boolean
  patientTypeId?: string
  originId?: string
}
export const {
  useReportQuerySoNhanMauQuery,
  useLazyReportQuerySoNhanMauQuery,
} = injectedRtkApi
