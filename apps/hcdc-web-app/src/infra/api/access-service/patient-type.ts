import { accessServiceApiSlice as api } from './slice'
export const addTagTypes = ['patient-types'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      patientTypeSearch: build.query<
        PatientTypeSearchApiResponse,
        PatientTypeSearchApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/patient-types/search`,
          method: 'POST',
          body: queryArg,
        }),
        providesTags: ['patient-types'],
      }),
      patientTypeCreate: build.mutation<
        PatientTypeCreateApiResponse,
        PatientTypeCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/patient-types`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['patient-types'],
      }),
      patientTypeFindById: build.query<
        PatientTypeFindByIdApiResponse,
        PatientTypeFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/v1/patient-types/${queryArg}` }),
        providesTags: ['patient-types'],
      }),
      patientTypeUpdateById: build.mutation<
        PatientTypeUpdateByIdApiResponse,
        PatientTypeUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/patient-types/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.patientTypeUpdateRequestDto,
        }),
        invalidatesTags: ['patient-types'],
      }),
      patientTypeDeleteById: build.mutation<
        PatientTypeDeleteByIdApiResponse,
        PatientTypeDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/patient-types/${queryArg}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['patient-types'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as patientTypeApi }
export type PatientTypeSearchApiResponse =
  /** status 200  */ PatientTypeSearchResponseDto
export type PatientTypeSearchApiArg = PatientTypeSearchRequestDto
export type PatientTypeCreateApiResponse =
  /** status 201  */ PatientTypeUnpopulatedResponseDto
export type PatientTypeCreateApiArg = PatientTypeCreateRequestDto
export type PatientTypeFindByIdApiResponse =
  /** status 200  */ PatientTypeResponseDto
export type PatientTypeFindByIdApiArg = string
export type PatientTypeUpdateByIdApiResponse =
  /** status 200  */ PatientTypeUnpopulatedResponseDto
export type PatientTypeUpdateByIdApiArg = {
  id: string
  patientTypeUpdateRequestDto: PatientTypeUpdateRequestDto
}
export type PatientTypeDeleteByIdApiResponse =
  /** status 200  */ PatientTypeUnpopulatedResponseDto
export type PatientTypeDeleteByIdApiArg = string
export type BranchUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  address: string
  type: 'Internal' | 'External'
  sampleOriginIds: string[]
}
export type PatientTypeResponseDto = {
  _id: string
  displayIndex: number
  name: string
  branchId: string
  branch?: BranchUnpopulatedResponseDto | null
}
export type PatientTypeSearchResponseDto = {
  total: number
  offset: number
  limit: number
  items: PatientTypeResponseDto[]
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
export type PatientTypeSearchRequestDto = {
  offset?: number
  limit?: number
  projection?: unknown
  sort?: object
  filter?: object
  populates?: PopulateOptionDto[]
}
export type PatientTypeUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  branchId: string
}
export type PatientTypeCreateRequestDto = {
  displayIndex: number
  name: string
  branchId: string
}
export type PatientTypeUpdateRequestDto = {
  displayIndex?: number
  name?: string
  branchId?: string
}
export const {
  usePatientTypeSearchQuery,
  useLazyPatientTypeSearchQuery,
  usePatientTypeCreateMutation,
  usePatientTypeFindByIdQuery,
  useLazyPatientTypeFindByIdQuery,
  usePatientTypeUpdateByIdMutation,
  usePatientTypeDeleteByIdMutation,
} = injectedRtkApi
