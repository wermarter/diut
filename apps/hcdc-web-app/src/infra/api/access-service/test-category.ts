import { accessServiceApiSlice as api } from './slice'
export const addTagTypes = ['v1-test-categories'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      testCategorySearch: build.query<
        TestCategorySearchApiResponse,
        TestCategorySearchApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/test-categories/search`,
          method: 'POST',
          body: queryArg,
        }),
        providesTags: ['v1-test-categories'],
      }),
      testCategoryCreate: build.mutation<
        TestCategoryCreateApiResponse,
        TestCategoryCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/test-categories`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['v1-test-categories'],
      }),
      testCategoryFindById: build.query<
        TestCategoryFindByIdApiResponse,
        TestCategoryFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/v1/test-categories/${queryArg}` }),
        providesTags: ['v1-test-categories'],
      }),
      testCategoryUpdateById: build.mutation<
        TestCategoryUpdateByIdApiResponse,
        TestCategoryUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/test-categories/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.testCategoryUpdateRequestDto,
        }),
        invalidatesTags: ['v1-test-categories'],
      }),
      testCategoryDeleteById: build.mutation<
        TestCategoryDeleteByIdApiResponse,
        TestCategoryDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/test-categories/${queryArg}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['v1-test-categories'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as testCategoryApi }
export type TestCategorySearchApiResponse =
  /** status 200  */ TestCategorySearchResponseDto
export type TestCategorySearchApiArg = TestCategorySearchRequestDto
export type TestCategoryCreateApiResponse =
  /** status 201  */ TestCategoryUnpopulatedResponseDto
export type TestCategoryCreateApiArg = TestCategoryCreateRequestDto
export type TestCategoryFindByIdApiResponse =
  /** status 200  */ TestCategoryResponseDto
export type TestCategoryFindByIdApiArg = string
export type TestCategoryUpdateByIdApiResponse =
  /** status 200  */ TestCategoryUnpopulatedResponseDto
export type TestCategoryUpdateByIdApiArg = {
  id: string
  testCategoryUpdateRequestDto: TestCategoryUpdateRequestDto
}
export type TestCategoryDeleteByIdApiResponse =
  /** status 200  */ TestCategoryUnpopulatedResponseDto
export type TestCategoryDeleteByIdApiArg = string
export type BranchUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  address: string
  type: 'Internal' | 'External'
  sampleOriginIds: string[]
}
export type TestCategoryResponseDto = {
  _id: string
  displayIndex: number
  name: string
  reportIndex: number
  branchId: string
  branch?: BranchUnpopulatedResponseDto | null
}
export type TestCategorySearchResponseDto = {
  total: number
  offset: number
  limit: number
  items: TestCategoryResponseDto[]
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
export type TestCategorySearchRequestDto = {
  offset?: number
  limit?: number
  sort?: object
  filter?: object
  populates?: PopulateOptionDto[]
}
export type TestCategoryUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  reportIndex: number
  branchId: string
}
export type TestCategoryCreateRequestDto = {
  displayIndex: number
  name: string
  reportIndex: number
  branchId: string
}
export type TestCategoryUpdateRequestDto = {
  displayIndex?: number
  name?: string
  reportIndex?: number
  branchId?: string
}
export const {
  useTestCategorySearchQuery,
  useLazyTestCategorySearchQuery,
  useTestCategoryCreateMutation,
  useTestCategoryFindByIdQuery,
  useLazyTestCategoryFindByIdQuery,
  useTestCategoryUpdateByIdMutation,
  useTestCategoryDeleteByIdMutation,
} = injectedRtkApi
