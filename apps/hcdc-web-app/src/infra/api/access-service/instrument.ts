import { accessServiceApiSlice as api } from './slice'
export const addTagTypes = ['v1-instruments'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      instrumentSearch: build.query<
        InstrumentSearchApiResponse,
        InstrumentSearchApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/instruments/search`,
          method: 'POST',
          body: queryArg,
        }),
        providesTags: ['v1-instruments'],
      }),
      instrumentCreate: build.mutation<
        InstrumentCreateApiResponse,
        InstrumentCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/instruments`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['v1-instruments'],
      }),
      instrumentFindById: build.query<
        InstrumentFindByIdApiResponse,
        InstrumentFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/v1/instruments/${queryArg}` }),
        providesTags: ['v1-instruments'],
      }),
      instrumentUpdateById: build.mutation<
        InstrumentUpdateByIdApiResponse,
        InstrumentUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/instruments/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.instrumentUpdateRequestDto,
        }),
        invalidatesTags: ['v1-instruments'],
      }),
      instrumentDeleteById: build.mutation<
        InstrumentDeleteByIdApiResponse,
        InstrumentDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/instruments/${queryArg}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['v1-instruments'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as instrumentApi }
export type InstrumentSearchApiResponse =
  /** status 200  */ InstrumentSearchResponseDto
export type InstrumentSearchApiArg = InstrumentSearchRequestDto
export type InstrumentCreateApiResponse =
  /** status 201  */ InstrumentUnpopulatedResponseDto
export type InstrumentCreateApiArg = InstrumentCreateRequestDto
export type InstrumentFindByIdApiResponse =
  /** status 200  */ InstrumentResponseDto
export type InstrumentFindByIdApiArg = string
export type InstrumentUpdateByIdApiResponse =
  /** status 200  */ InstrumentUnpopulatedResponseDto
export type InstrumentUpdateByIdApiArg = {
  id: string
  instrumentUpdateRequestDto: InstrumentUpdateRequestDto
}
export type InstrumentDeleteByIdApiResponse =
  /** status 200  */ InstrumentUnpopulatedResponseDto
export type InstrumentDeleteByIdApiArg = string
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
export type BranchUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  address: string
  type: 'Internal' | 'External'
  sampleOriginIds: string[]
}
export type InstrumentResponseDto = {
  _id: string
  displayIndex: number
  name: string
  testId: string
  branchId: string
  test?: TestUnpopulatedResponseDto | null
  branch?: BranchUnpopulatedResponseDto | null
}
export type InstrumentSearchResponseDto = {
  total: number
  offset: number
  limit: number
  items: InstrumentResponseDto[]
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
export type InstrumentSearchRequestDto = {
  offset?: number
  limit?: number
  projection?: unknown
  sort?: object
  filter?: object
  populates?: PopulateOptionDto[]
}
export type InstrumentUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  testId: string
  branchId: string
}
export type InstrumentCreateRequestDto = {
  displayIndex: number
  name: string
  testId: string
  branchId: string
}
export type InstrumentUpdateRequestDto = {
  displayIndex?: number
  name?: string
  testId?: string
  branchId?: string
}
export const {
  useInstrumentSearchQuery,
  useLazyInstrumentSearchQuery,
  useInstrumentCreateMutation,
  useInstrumentFindByIdQuery,
  useLazyInstrumentFindByIdQuery,
  useInstrumentUpdateByIdMutation,
  useInstrumentDeleteByIdMutation,
} = injectedRtkApi
