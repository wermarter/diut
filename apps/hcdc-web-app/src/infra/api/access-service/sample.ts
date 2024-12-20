import { fileReponseHandler } from '../utils'
import { accessServiceApiSlice as api } from './slice'
export const addTagTypes = ['samples'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      sampleUploadResultImage: build.mutation<
        SampleUploadResultImageApiResponse,
        SampleUploadResultImageApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/samples/upload`,
          method: 'POST',
          body: queryArg.sampleUploadImageRequestDto,
          params: {
            sampleId: queryArg.sampleId,
            testElementId: queryArg.testElementId,
          },
        }),
        invalidatesTags: ['samples'],
      }),
      sampleSearch: build.query<SampleSearchApiResponse, SampleSearchApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/samples/search`,
          method: 'POST',
          body: queryArg,
        }),
        providesTags: ['samples'],
      }),
      sampleCreate: build.mutation<SampleCreateApiResponse, SampleCreateApiArg>(
        {
          query: (queryArg) => ({
            url: `/api/v1/samples`,
            method: 'POST',
            body: queryArg,
          }),
          invalidatesTags: ['samples'],
        },
      ),
      sampleDownloadResultImage: build.query<
        SampleDownloadResultImageApiResponse,
        SampleDownloadResultImageApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/samples/download`,
          params: {
            sampleId: queryArg.sampleId,
            testElementId: queryArg.testElementId,
          },
          responseHandler: fileReponseHandler({ mode: 'url' }),
        }),
        providesTags: ['samples'],
      }),
      sampleFindInfoById: build.query<
        SampleFindInfoByIdApiResponse,
        SampleFindInfoByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/v1/samples/${queryArg}/info` }),
        providesTags: ['samples'],
      }),
      sampleUpdateInfoById: build.mutation<
        SampleUpdateInfoByIdApiResponse,
        SampleUpdateInfoByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/samples/${queryArg.id}/info`,
          method: 'PATCH',
          body: queryArg.sampleUpdateInfoRequestDto,
        }),
        invalidatesTags: ['samples'],
      }),
      sampleFindById: build.query<
        SampleFindByIdApiResponse,
        SampleFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/v1/samples/${queryArg}` }),
        providesTags: ['samples'],
      }),
      sampleDeleteById: build.mutation<
        SampleDeleteByIdApiResponse,
        SampleDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/samples/${queryArg}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['samples'],
      }),
      sampleUpdateResultById: build.mutation<
        SampleUpdateResultByIdApiResponse,
        SampleUpdateResultByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/samples/${queryArg.id}/result`,
          method: 'PATCH',
          body: queryArg.sampleUpdateResultRequestDto,
        }),
        invalidatesTags: ['samples'],
      }),
      sampleLock: build.mutation<SampleLockApiResponse, SampleLockApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/samples/${queryArg}/lock`,
          method: 'POST',
        }),
        invalidatesTags: ['samples'],
      }),
      sampleUnlock: build.mutation<SampleUnlockApiResponse, SampleUnlockApiArg>(
        {
          query: (queryArg) => ({
            url: `/api/v1/samples/${queryArg}/unlock`,
            method: 'POST',
          }),
          invalidatesTags: ['samples'],
        },
      ),
      samplePrint: build.mutation<SamplePrintApiResponse, SamplePrintApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/samples/print`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['samples'],
      }),
      sampleGetPrintPath: build.query<
        SampleGetPrintPathApiResponse,
        SampleGetPrintPathApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/samples/get-print-path`,
          method: 'POST',
          body: queryArg,
        }),
        providesTags: ['samples'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as sampleApi }
export type SampleUploadResultImageApiResponse =
  /** status 200  */ SampleUploadImageResponseDto
export type SampleUploadResultImageApiArg = {
  sampleId: string
  testElementId: string
  sampleUploadImageRequestDto: SampleUploadImageRequestDto
}
export type SampleSearchApiResponse = /** status 200  */ SampleSearchResponseDto
export type SampleSearchApiArg = SampleSearchRequestDto
export type SampleCreateApiResponse = /** status 201  */ SampleCreateResponseDto
export type SampleCreateApiArg = SampleCreateRequestDto
export type SampleDownloadResultImageApiResponse = unknown
export type SampleDownloadResultImageApiArg = {
  sampleId: string
  testElementId: string
}
export type SampleFindInfoByIdApiResponse = /** status 200  */ SampleResponseDto
export type SampleFindInfoByIdApiArg = string
export type SampleUpdateInfoByIdApiResponse =
  /** status 200  */ SampleUpdateInfoResponseDto
export type SampleUpdateInfoByIdApiArg = {
  id: string
  sampleUpdateInfoRequestDto: SampleUpdateInfoRequestDto
}
export type SampleFindByIdApiResponse = /** status 200  */ SampleResponseDto
export type SampleFindByIdApiArg = string
export type SampleDeleteByIdApiResponse =
  /** status 200  */ SampleUnpopulatedResponseDto
export type SampleDeleteByIdApiArg = string
export type SampleUpdateResultByIdApiResponse =
  /** status 200  */ SampleUpdateResultResponseDto
export type SampleUpdateResultByIdApiArg = {
  id: string
  sampleUpdateResultRequestDto: SampleUpdateResultRequestDto
}
export type SampleLockApiResponse = unknown
export type SampleLockApiArg = string
export type SampleUnlockApiResponse = unknown
export type SampleUnlockApiArg = string
export type SamplePrintApiResponse = unknown
export type SamplePrintApiArg = SamplePrintRequestDto
export type SampleGetPrintPathApiResponse =
  /** status 200  */ SampleGetPrintPathResponseDto
export type SampleGetPrintPathApiArg = SamplePrintRequestDto
export type SampleUploadImageResponseDto = {
  storageKey: string
}
export type HttpErrorResponse = {
  errorCode:
    | 'UNKNOWN'
    | 'AUTHN'
    | 'AUTHN_JWT_INVALID_TOKEN'
    | 'AUTHN_LOGIN_INVALID_USERNAME'
    | 'AUTHN_LOGIN_INVALID_PASSWORD'
    | 'AUTHN_COOKIE_NOT_FOUND'
    | 'AUTHN_PAYLOAD_INVALID'
    | 'AUTHZ'
    | 'AUTHZ_AUTHENTICATION_REQUIRED'
    | 'AUTHZ_PERMISSION_DENIED'
    | 'AUTHZ_CONTEXT_INVALID'
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
export type SampleUploadImageRequestDto = {
  file: Blob
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
  billId: string
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
  isLocked: boolean
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
export type SampleSearchResponseDto = {
  total: number
  offset: number
  limit: number
  items: OmittedSampleResponseDto[]
}
export type PopulateOptionDto = {
  path: string
  isDeleted?: boolean | null
  fields?: string[]
  match?: object
}
export type SampleSearchRequestDto = {
  offset?: number
  limit?: number
  /** mongoose Query.sort() */
  sort?: object
  projection?: object
  /** mongoose FilterQuery */
  filter?: object
  populates?: PopulateOptionDto[]
}
export type SampleCreateResponseDto = {
  _id: string
  sampleId: string
  billId: string
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
  results: OmittedTestResponseDto[]
}
export type SampleCreateRequestDto = {
  sampleId: string
  billId: string
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
  testIds: string[]
}
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
export type SampleResponseDto = {
  _id: string
  sampleId: string
  billId: string
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
  results: SampleResultTestResponseDto[]
  isConfirmed: boolean
  isLocked: boolean
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
}
export type SampleUpdateInfoResponseDto = {
  _id: string
  sampleId: string
  billId: string
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
  isLocked: boolean
  results: OmittedTestResponseDto[]
}
export type SampleUpdateInfoRequestDto = {
  sampleId?: string
  billId?: string
  note?: string
  isNgoaiGio?: boolean
  isTraBuuDien?: boolean
  isPregnant?: boolean
  infoAt?: string
  sampledAt?: string
  patientId?: string
  doctorId?: string
  patientTypeId?: string
  diagnosisId?: string
  originId?: string
  sampleTypeIds?: string[]
  branchId?: string
  isConfirmed?: boolean
  addedTestIds?: string[]
  removedTestIds?: string[]
}
export type SampleResultTestElementRequestDto = {
  testElementId: string
  value: string
  isAbnormal: boolean
}
export type SampleResultTestRequestDto = {
  testId: string
  isLocked: boolean
  elements: SampleResultTestElementRequestDto[]
}
export type SampleUnpopulatedResponseDto = {
  _id: string
  sampleId: string
  billId: string
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
  results: SampleResultTestRequestDto[]
  isConfirmed: boolean
  isLocked: boolean
  sampleCompleted: boolean
  printedAt?: string
  infoById: string
  printedById?: string
}
export type SampleUpdateResultResponseDto = {
  _id: string
  results: SampleResultTestRequestDto[]
}
export type SampleUpdateResultRequestDto = {
  results: SampleResultTestRequestDto[]
}
export type OverrideAuthorRequestDto = {
  authorTitle: string
  authorName: string
}
export type SamplePrintSingleRequestDto = {
  sampleId: string
  printFormId: string
  testIds: string[]
  sampleTypeIds: string[]
  overrideAuthor?: OverrideAuthorRequestDto
  overrideTitleMargin?: number
}
export type SamplePrintRequestDto = {
  requests: SamplePrintSingleRequestDto[]
}
export type SampleGetPrintPathResponseDto = {
  path: string
}
export const {
  useSampleUploadResultImageMutation,
  useSampleSearchQuery,
  useLazySampleSearchQuery,
  useSampleCreateMutation,
  useSampleDownloadResultImageQuery,
  useLazySampleDownloadResultImageQuery,
  useSampleFindInfoByIdQuery,
  useLazySampleFindInfoByIdQuery,
  useSampleUpdateInfoByIdMutation,
  useSampleFindByIdQuery,
  useLazySampleFindByIdQuery,
  useSampleDeleteByIdMutation,
  useSampleUpdateResultByIdMutation,
  useSampleLockMutation,
  useSampleUnlockMutation,
  useSamplePrintMutation,
  useSampleGetPrintPathQuery,
  useLazySampleGetPrintPathQuery,
} = injectedRtkApi
