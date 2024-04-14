import { accessServiceApiSlice as api } from './slice'
export const addTagTypes = ['v1-patients'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      patientSearch: build.query<PatientSearchApiResponse, PatientSearchApiArg>(
        {
          query: (queryArg) => ({
            url: `/api/v1/patients/search`,
            method: 'POST',
            body: queryArg,
          }),
          providesTags: ['v1-patients'],
        },
      ),
      patientCreate: build.mutation<
        PatientCreateApiResponse,
        PatientCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/patients`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['v1-patients'],
      }),
      patientFindById: build.query<
        PatientFindByIdApiResponse,
        PatientFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/v1/patients/${queryArg}` }),
        providesTags: ['v1-patients'],
      }),
      patientUpdateById: build.mutation<
        PatientUpdateByIdApiResponse,
        PatientUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/patients/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.patientUpdateRequestDto,
        }),
        invalidatesTags: ['v1-patients'],
      }),
      patientDeleteById: build.mutation<
        PatientDeleteByIdApiResponse,
        PatientDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/patients/${queryArg}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['v1-patients'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as patientApi }
export type PatientSearchApiResponse =
  /** status 200  */ PatientSearchResponseDto
export type PatientSearchApiArg = PatientSearchRequestDto
export type PatientCreateApiResponse =
  /** status 201  */ PatientUnpopulatedResponseDto
export type PatientCreateApiArg = PatientCreateRequestDto
export type PatientFindByIdApiResponse = /** status 200  */ PatientResponseDto
export type PatientFindByIdApiArg = string
export type PatientUpdateByIdApiResponse =
  /** status 200  */ PatientUnpopulatedResponseDto
export type PatientUpdateByIdApiArg = {
  id: string
  patientUpdateRequestDto: PatientUpdateRequestDto
}
export type PatientDeleteByIdApiResponse =
  /** status 200  */ PatientUnpopulatedResponseDto
export type PatientDeleteByIdApiArg = string
export type BranchUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  address: string
  type: 'Internal' | 'External'
  sampleOriginIds: string[]
}
export type PatientResponseDto = {
  _id: string
  externalId: string
  name: string
  gender: 'Male' | 'Female'
  birthYear: number
  address: string
  phoneNumber: string
  SSN: string
  branchId: string
  branch?: BranchUnpopulatedResponseDto | null
}
export type PatientSearchResponseDto = {
  total: number
  offset: number
  limit: number
  items: PatientResponseDto[]
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
export type PatientSearchRequestDto = {
  offset?: number
  limit?: number
  sort?: object
  filter?: object
  populates?: PopulateOptionDto[]
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
export type PatientCreateRequestDto = {
  externalId: string
  name: string
  gender: 'Male' | 'Female'
  birthYear: number
  address: string
  phoneNumber: string
  SSN: string
  branchId: string
}
export type PatientUpdateRequestDto = {
  externalId?: string
  name?: string
  gender?: 'Male' | 'Female'
  birthYear?: number
  address?: string
  phoneNumber?: string
  SSN?: string
  branchId?: string
}
export const {
  usePatientSearchQuery,
  useLazyPatientSearchQuery,
  usePatientCreateMutation,
  usePatientFindByIdQuery,
  useLazyPatientFindByIdQuery,
  usePatientUpdateByIdMutation,
  usePatientDeleteByIdMutation,
} = injectedRtkApi
