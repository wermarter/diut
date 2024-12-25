import { fileReponseHandler } from '../utils'
import { accessServiceApiSlice as api } from './slice'
export const addTagTypes = ['reports'] as const
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
        providesTags: ['reports'],
      }),
      reportExportSoNhanMau: build.mutation<
        ReportExportSoNhanMauApiResponse,
        ReportExportSoNhanMauApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/reports/so-nhan-mau/export`,
          method: 'POST',
          body: queryArg,
          responseHandler: fileReponseHandler({ mode: 'download' }),
        }),
        invalidatesTags: ['reports'],
      }),
      reportExportSinhHoa: build.mutation<
        ReportExportSinhHoaApiResponse,
        ReportExportSinhHoaApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/reports/sinh-hoa/export`,
          method: 'POST',
          body: queryArg,
          responseHandler: fileReponseHandler({ mode: 'download' }),
        }),
        invalidatesTags: ['reports'],
      }),
      reportExportSoiNhuom: build.mutation<
        ReportExportSoiNhuomApiResponse,
        ReportExportSoiNhuomApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/reports/soi-nhuom/export`,
          method: 'POST',
          body: queryArg,
          responseHandler: fileReponseHandler({ mode: 'download' }),
        }),
        invalidatesTags: ['reports'],
      }),
      reportExportTdd: build.mutation<
        ReportExportTddApiResponse,
        ReportExportTddApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/reports/tdd/export`,
          method: 'POST',
          body: queryArg,
          responseHandler: fileReponseHandler({ mode: 'download' }),
        }),
        invalidatesTags: ['reports'],
      }),
      reportExportUrine: build.mutation<
        ReportExportUrineApiResponse,
        ReportExportUrineApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/reports/urine/export`,
          method: 'POST',
          body: queryArg,
          responseHandler: fileReponseHandler({ mode: 'download' }),
        }),
        invalidatesTags: ['reports'],
      }),
      reportExportHcg: build.mutation<
        ReportExportHcgApiResponse,
        ReportExportHcgApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/reports/hcg/export`,
          method: 'POST',
          body: queryArg,
          responseHandler: fileReponseHandler({ mode: 'download' }),
        }),
        invalidatesTags: ['reports'],
      }),
      reportExportPap: build.mutation<
        ReportExportPapApiResponse,
        ReportExportPapApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/reports/pap/export`,
          method: 'POST',
          body: queryArg,
          responseHandler: fileReponseHandler({ mode: 'download' }),
        }),
        invalidatesTags: ['reports'],
      }),
      reportExportThinprep: build.mutation<
        ReportExportThinprepApiResponse,
        ReportExportThinprepApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/reports/thinprep/export`,
          method: 'POST',
          body: queryArg,
          responseHandler: fileReponseHandler({ mode: 'download' }),
        }),
        invalidatesTags: ['reports'],
      }),
      reportExportHiv: build.mutation<
        ReportExportHivApiResponse,
        ReportExportHivApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/reports/hiv/export`,
          method: 'POST',
          body: queryArg,
          responseHandler: fileReponseHandler({ mode: 'download' }),
        }),
        invalidatesTags: ['reports'],
      }),
      reportExportCtm: build.mutation<
        ReportExportCtmApiResponse,
        ReportExportCtmApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/reports/ctm/export`,
          method: 'POST',
          body: queryArg,
          responseHandler: fileReponseHandler({ mode: 'download' }),
        }),
        invalidatesTags: ['reports'],
      }),
      reportExportTraKq: build.mutation<
        ReportExportTraKqApiResponse,
        ReportExportTraKqApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/reports/tra-kq/export`,
          method: 'POST',
          body: queryArg,
          responseHandler: fileReponseHandler({ mode: 'download' }),
        }),
        invalidatesTags: ['reports'],
      }),
      reportExportGiaoNhan: build.mutation<
        ReportExportGiaoNhanApiResponse,
        ReportExportGiaoNhanApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/reports/giao-nhan/export`,
          method: 'POST',
          body: queryArg,
          responseHandler: fileReponseHandler({ mode: 'download' }),
        }),
        invalidatesTags: ['reports'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as reportApi }
export type ReportQuerySoNhanMauApiResponse =
  /** status 200  */ ReportQuerySoNhanMauResponseDto
export type ReportQuerySoNhanMauApiArg = ReportQuerySoNhanMauRequestDto
export type ReportExportSoNhanMauApiResponse = unknown
export type ReportExportSoNhanMauApiArg = ExportSoNhanMauRequestDto
export type ReportExportSinhHoaApiResponse = unknown
export type ReportExportSinhHoaApiArg = ExportSinhHoaRequestDto
export type ReportExportSoiNhuomApiResponse = unknown
export type ReportExportSoiNhuomApiArg = ExportSoiNhuomRequestDto
export type ReportExportTddApiResponse = unknown
export type ReportExportTddApiArg = ExportTddRequestDto
export type ReportExportUrineApiResponse = unknown
export type ReportExportUrineApiArg = ExportUrineRequestDto
export type ReportExportHcgApiResponse = unknown
export type ReportExportHcgApiArg = ExportHcgRequestDto
export type ReportExportPapApiResponse = unknown
export type ReportExportPapApiArg = ExportPapRequestDto
export type ReportExportThinprepApiResponse = unknown
export type ReportExportThinprepApiArg = ExportThinprepRequestDto
export type ReportExportHivApiResponse = unknown
export type ReportExportHivApiArg = ExportHivRequestDto
export type ReportExportCtmApiResponse = unknown
export type ReportExportCtmApiArg = ExportCtmRequestDto
export type ReportExportTraKqApiResponse = unknown
export type ReportExportTraKqApiArg = ExportTraKqRequestDto
export type ReportExportGiaoNhanApiResponse = unknown
export type ReportExportGiaoNhanApiArg = ExportGiaoNhanRequestDto
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
    | 'Report'
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
    | 'Export'
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
  reportConfig: object
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
  printFormIds: string[]
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
  fromDate: string
  toDate: string
  branchId: string
  offset?: number
  limit?: number
  isNgoaiGio?: boolean
  patientTypeId?: string
  originId?: string
}
export type ExportSoNhanMauRequestDto = {
  fromDate: string
  toDate: string
  branchId: string
  isNgoaiGio?: boolean
  patientTypeId?: string
  originId?: string
}
export type ExportSinhHoaRequestDto = {
  fromDate: string
  toDate: string
  branchId: string
  originIds: string[]
}
export type ExportSoiNhuomRequestDto = {
  fromDate: string
  toDate: string
  branchId: string
  originIds: string[]
}
export type ExportTddRequestDto = {
  fromDate: string
  toDate: string
  branchId: string
  originIds: string[]
}
export type ExportUrineRequestDto = {
  fromDate: string
  toDate: string
  branchId: string
  originIds: string[]
}
export type ExportHcgRequestDto = {
  fromDate: string
  toDate: string
  branchId: string
  originIds: string[]
}
export type ExportPapRequestDto = {
  fromDate: string
  toDate: string
  branchId: string
  originIds: string[]
}
export type ExportThinprepRequestDto = {
  fromDate: string
  toDate: string
  branchId: string
  originIds: string[]
}
export type ExportHivRequestDto = {
  fromDate: string
  toDate: string
  branchId: string
  originIds: string[]
}
export type ExportCtmRequestDto = {
  fromDate: string
  toDate: string
  branchId: string
  originIds: string[]
}
export type ExportTraKqRequestDto = {
  fromDate: string
  toDate: string
  branchId: string
  originIds: string[]
  patientTypeIds: string[]
  testIds: string[]
  testComboIds: string[]
}
export type ExportGiaoNhanRequestDto = {
  fromDate: string
  toDate: string
  branchId: string
  originIds: string[]
  patientTypeIds: string[]
  testIds: string[]
  testComboIds: string[]
}
export const {
  useReportQuerySoNhanMauQuery,
  useLazyReportQuerySoNhanMauQuery,
  useReportExportSoNhanMauMutation,
  useReportExportSinhHoaMutation,
  useReportExportSoiNhuomMutation,
  useReportExportTddMutation,
  useReportExportUrineMutation,
  useReportExportHcgMutation,
  useReportExportPapMutation,
  useReportExportThinprepMutation,
  useReportExportHivMutation,
  useReportExportCtmMutation,
  useReportExportTraKqMutation,
  useReportExportGiaoNhanMutation,
} = injectedRtkApi
