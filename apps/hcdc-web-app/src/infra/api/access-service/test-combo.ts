import { accessServiceApiSlice as api } from './slice'
export const addTagTypes = ['v1-test-combos'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      testComboSearch: build.query<
        TestComboSearchApiResponse,
        TestComboSearchApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/test-combos/search`,
          method: 'POST',
          body: queryArg,
        }),
        providesTags: ['v1-test-combos'],
      }),
      testComboCreate: build.mutation<
        TestComboCreateApiResponse,
        TestComboCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/test-combos`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['v1-test-combos'],
      }),
      testComboFindById: build.query<
        TestComboFindByIdApiResponse,
        TestComboFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/v1/test-combos/${queryArg}` }),
        providesTags: ['v1-test-combos'],
      }),
      testComboUpdateById: build.mutation<
        TestComboUpdateByIdApiResponse,
        TestComboUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/test-combos/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.testComboUpdateRequestDto,
        }),
        invalidatesTags: ['v1-test-combos'],
      }),
      testComboDeleteById: build.mutation<
        TestComboDeleteByIdApiResponse,
        TestComboDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/test-combos/${queryArg}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['v1-test-combos'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as testComboApi }
export type TestComboSearchApiResponse =
  /** status 200  */ TestComboSearchResponseDto
export type TestComboSearchApiArg = TestComboSearchRequestDto
export type TestComboCreateApiResponse =
  /** status 201  */ TestComboUnpopulatedResponseDto
export type TestComboCreateApiArg = TestComboCreateRequestDto
export type TestComboFindByIdApiResponse =
  /** status 200  */ TestComboResponseDto
export type TestComboFindByIdApiArg = string
export type TestComboUpdateByIdApiResponse =
  /** status 200  */ TestComboUnpopulatedResponseDto
export type TestComboUpdateByIdApiArg = {
  id: string
  testComboUpdateRequestDto: TestComboUpdateRequestDto
}
export type TestComboDeleteByIdApiResponse =
  /** status 200  */ TestComboUnpopulatedResponseDto
export type TestComboDeleteByIdApiArg = string
export type TestUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  shouldDisplayWithChildren: boolean
  bioProductId?: string
  instrumentId?: string
  sampleTypeId: string
  testCategoryId: string
  printFormId?: string
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
export type TestComboResponseDto = {
  _id: string
  displayIndex: number
  name: string
  testIds: string[]
  branchId: string
  tests?: TestUnpopulatedResponseDto[]
  branch?: BranchUnpopulatedResponseDto | null
}
export type TestComboSearchResponseDto = {
  total: number
  offset: number
  limit: number
  items: TestComboResponseDto[]
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
export type TestComboSearchRequestDto = {
  offset?: number
  limit?: number
  sort?: object
  filter?: object
  populates?: PopulateOptionDto[]
}
export type TestComboUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  testIds: string[]
  branchId: string
}
export type TestComboCreateRequestDto = {
  displayIndex: number
  name: string
  testIds: string[]
  branchId: string
}
export type TestComboUpdateRequestDto = {
  displayIndex?: number
  name?: string
  testIds?: string[]
  branchId?: string
}
export const {
  useTestComboSearchQuery,
  useLazyTestComboSearchQuery,
  useTestComboCreateMutation,
  useTestComboFindByIdQuery,
  useLazyTestComboFindByIdQuery,
  useTestComboUpdateByIdMutation,
  useTestComboDeleteByIdMutation,
} = injectedRtkApi
