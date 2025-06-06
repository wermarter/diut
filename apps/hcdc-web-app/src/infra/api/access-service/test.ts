import { accessServiceApiSlice as api } from './slice'
export const addTagTypes = ['tests'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      testSearch: build.query<TestSearchApiResponse, TestSearchApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/tests/search`,
          method: 'POST',
          body: queryArg,
        }),
        providesTags: ['tests'],
      }),
      testCreate: build.mutation<TestCreateApiResponse, TestCreateApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/tests`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['tests'],
      }),
      testFindById: build.query<TestFindByIdApiResponse, TestFindByIdApiArg>({
        query: (queryArg) => ({ url: `/api/v1/tests/${queryArg}` }),
        providesTags: ['tests'],
      }),
      testUpdateById: build.mutation<
        TestUpdateByIdApiResponse,
        TestUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/tests/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.testUpdateRequestDto,
        }),
        invalidatesTags: ['tests'],
      }),
      testDeleteById: build.mutation<
        TestDeleteByIdApiResponse,
        TestDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/tests/${queryArg}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['tests'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as testApi }
export type TestSearchApiResponse = /** status 200  */ TestSearchResponseDto
export type TestSearchApiArg = TestSearchRequestDto
export type TestCreateApiResponse =
  /** status 201  */ TestUnpopulatedResponseDto
export type TestCreateApiArg = TestCreateRequestDto
export type TestFindByIdApiResponse = /** status 200  */ TestResponseDto
export type TestFindByIdApiArg = string
export type TestUpdateByIdApiResponse =
  /** status 200  */ TestUnpopulatedResponseDto
export type TestUpdateByIdApiArg = {
  id: string
  testUpdateRequestDto: TestUpdateRequestDto
}
export type TestDeleteByIdApiResponse =
  /** status 200  */ TestUnpopulatedResponseDto
export type TestDeleteByIdApiArg = string
export type BioProductUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  testId: string
  branchId: string
}
export type InstrumentUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  testId: string
  branchId: string
}
export type SampleTypeUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  branchId: string
}
export type TestCategoryUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  reportIndex: number
  branchId: string
}
export type PrintFormUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  isA4: boolean
  isAuthorLocked: boolean
  authorTitle: string
  authorName: string
  titleMargin: number
  template: 'FormChung' | 'FormHIV' | 'FormPap' | 'FormSoiNhuom' | 'FormTD'
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
export type TestResponseDto = {
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
  bioProduct?: BioProductUnpopulatedResponseDto | null
  instrument?: InstrumentUnpopulatedResponseDto | null
  sampleType?: SampleTypeUnpopulatedResponseDto | null
  testCategory?: TestCategoryUnpopulatedResponseDto | null
  printForms?: PrintFormUnpopulatedResponseDto[]
  branch?: BranchUnpopulatedResponseDto | null
}
export type TestSearchResponseDto = {
  total: number
  offset: number
  limit: number
  items: TestResponseDto[]
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
export type PopulateOptionDto = {
  path: string
  isDeleted?: boolean | null
  fields?: string[]
  match?: object
}
export type TestSearchRequestDto = {
  offset?: number
  limit?: number
  projection?: unknown
  sort?: object
  filter?: object
  populates?: PopulateOptionDto[]
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
export type TestCreateRequestDto = {
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
export type TestUpdateRequestDto = {
  displayIndex?: number
  name?: string
  shouldDisplayWithChildren?: boolean
  bioProductId?: string | null
  instrumentId?: string | null
  sampleTypeId?: string | null
  testCategoryId?: string
  printFormIds?: string[]
  branchId?: string
}
export const {
  useTestSearchQuery,
  useLazyTestSearchQuery,
  useTestCreateMutation,
  useTestFindByIdQuery,
  useLazyTestFindByIdQuery,
  useTestUpdateByIdMutation,
  useTestDeleteByIdMutation,
} = injectedRtkApi
