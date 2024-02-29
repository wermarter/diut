import { accessServiceApiSlice as api } from './slice'
export const addTagTypes = ['v1-sample-types'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      sampleTypeSearch: build.query<
        SampleTypeSearchApiResponse,
        SampleTypeSearchApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/sample-types/search`,
          method: 'POST',
          body: queryArg,
        }),
        providesTags: ['v1-sample-types'],
      }),
      sampleTypeCreate: build.mutation<
        SampleTypeCreateApiResponse,
        SampleTypeCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/sample-types`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['v1-sample-types'],
      }),
      sampleTypeFindById: build.query<
        SampleTypeFindByIdApiResponse,
        SampleTypeFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/v1/sample-types/${queryArg}` }),
        providesTags: ['v1-sample-types'],
      }),
      sampleTypeUpdateById: build.mutation<
        SampleTypeUpdateByIdApiResponse,
        SampleTypeUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/sample-types/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.sampleTypeUpdateRequestDto,
        }),
        invalidatesTags: ['v1-sample-types'],
      }),
      sampleTypeDeleteById: build.mutation<
        SampleTypeDeleteByIdApiResponse,
        SampleTypeDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/sample-types/${queryArg}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['v1-sample-types'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as sampleTypeApi }
export type SampleTypeSearchApiResponse =
  /** status 200  */ SampleTypeSearchResponseDto
export type SampleTypeSearchApiArg = SampleTypeSearchRequestDto
export type SampleTypeCreateApiResponse =
  /** status 201  */ SampleTypeUnpopulatedResponseDto
export type SampleTypeCreateApiArg = SampleTypeCreateRequestDto
export type SampleTypeFindByIdApiResponse =
  /** status 200  */ SampleTypeResponseDto
export type SampleTypeFindByIdApiArg = string
export type SampleTypeUpdateByIdApiResponse =
  /** status 200  */ SampleTypeUnpopulatedResponseDto
export type SampleTypeUpdateByIdApiArg = {
  id: string
  sampleTypeUpdateRequestDto: SampleTypeUpdateRequestDto
}
export type SampleTypeDeleteByIdApiResponse =
  /** status 200  */ SampleTypeUnpopulatedResponseDto
export type SampleTypeDeleteByIdApiArg = string
export type BranchUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  address: string
  type: 'Internal' | 'External'
  sampleOriginIds: string[]
}
export type SampleTypeResponseDto = {
  _id: string
  displayIndex: number
  name: string
  branchId: string
  branch?: BranchUnpopulatedResponseDto | null
}
export type SampleTypeSearchResponseDto = {
  total: number
  offset: number
  limit: number
  items: SampleTypeResponseDto[]
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
    | 'SERVICE'
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
export type SampleTypeSearchRequestDto = {
  offset?: number
  limit?: number
  sort?: object
  filter?: object
  populates?: PopulateOptionDto[]
}
export type SampleTypeUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  branchId: string
}
export type SampleTypeCreateRequestDto = {
  displayIndex: number
  name: string
  branchId: string
}
export type SampleTypeUpdateRequestDto = {
  displayIndex?: number
  name?: string
  branchId?: string
}
export const {
  useSampleTypeSearchQuery,
  useLazySampleTypeSearchQuery,
  useSampleTypeCreateMutation,
  useSampleTypeFindByIdQuery,
  useLazySampleTypeFindByIdQuery,
  useSampleTypeUpdateByIdMutation,
  useSampleTypeDeleteByIdMutation,
} = injectedRtkApi
