import { accessServiceApiSlice as api } from './slice'
export const addTagTypes = ['v1-diagnoses'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      diagnosisSearch: build.query<
        DiagnosisSearchApiResponse,
        DiagnosisSearchApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/diagnoses/search`,
          method: 'POST',
          body: queryArg,
        }),
        providesTags: ['v1-diagnoses'],
      }),
      diagnosisCreate: build.mutation<
        DiagnosisCreateApiResponse,
        DiagnosisCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/diagnoses`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['v1-diagnoses'],
      }),
      diagnosisFindById: build.query<
        DiagnosisFindByIdApiResponse,
        DiagnosisFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/v1/diagnoses/${queryArg}` }),
        providesTags: ['v1-diagnoses'],
      }),
      diagnosisUpdateById: build.mutation<
        DiagnosisUpdateByIdApiResponse,
        DiagnosisUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/diagnoses/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.diagnosisUpdateRequestDto,
        }),
        invalidatesTags: ['v1-diagnoses'],
      }),
      diagnosisDeleteById: build.mutation<
        DiagnosisDeleteByIdApiResponse,
        DiagnosisDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/diagnoses/${queryArg}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['v1-diagnoses'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as diagnosisApi }
export type DiagnosisSearchApiResponse =
  /** status 200  */ DiagnosisSearchResponseDto
export type DiagnosisSearchApiArg = DiagnosisSearchRequestDto
export type DiagnosisCreateApiResponse =
  /** status 201  */ DiagnosisUnpopulatedResponseDto
export type DiagnosisCreateApiArg = DiagnosisCreateRequestDto
export type DiagnosisFindByIdApiResponse =
  /** status 200  */ DiagnosisResponseDto
export type DiagnosisFindByIdApiArg = string
export type DiagnosisUpdateByIdApiResponse =
  /** status 200  */ DiagnosisUnpopulatedResponseDto
export type DiagnosisUpdateByIdApiArg = {
  id: string
  diagnosisUpdateRequestDto: DiagnosisUpdateRequestDto
}
export type DiagnosisDeleteByIdApiResponse =
  /** status 200  */ DiagnosisUnpopulatedResponseDto
export type DiagnosisDeleteByIdApiArg = string
export type BranchUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  address: string
  type: 'Internal' | 'External'
  sampleOriginIds: string[]
}
export type DiagnosisResponseDto = {
  _id: string
  displayIndex: number
  name: string
  branchId: string
  branch?: BranchUnpopulatedResponseDto | null
}
export type DiagnosisSearchResponseDto = {
  total: number
  offset: number
  limit: number
  items: DiagnosisResponseDto[]
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
export type PopulateOptionDto = {
  path: string
  isDeleted?: boolean | null
  fields?: string[]
  match?: object
}
export type DiagnosisSearchRequestDto = {
  offset?: number
  limit?: number
  projection?: unknown
  sort?: object
  filter?: object
  populates?: PopulateOptionDto[]
}
export type DiagnosisUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  branchId: string
}
export type DiagnosisCreateRequestDto = {
  displayIndex: number
  name: string
  branchId: string
}
export type DiagnosisUpdateRequestDto = {
  displayIndex?: number
  name?: string
  branchId?: string
}
export const {
  useDiagnosisSearchQuery,
  useLazyDiagnosisSearchQuery,
  useDiagnosisCreateMutation,
  useDiagnosisFindByIdQuery,
  useLazyDiagnosisFindByIdQuery,
  useDiagnosisUpdateByIdMutation,
  useDiagnosisDeleteByIdMutation,
} = injectedRtkApi
