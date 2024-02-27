import { accessServiceApiSlice as api } from './slice'
export const addTagTypes = ['v1-test-elements'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      testElementSearch: build.query<
        TestElementSearchApiResponse,
        TestElementSearchApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/test-elements/search`,
          method: 'POST',
          body: queryArg,
        }),
        providesTags: ['v1-test-elements'],
      }),
      testElementCreate: build.mutation<
        TestElementCreateApiResponse,
        TestElementCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/test-elements`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['v1-test-elements'],
      }),
      testElementFindById: build.query<
        TestElementFindByIdApiResponse,
        TestElementFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/v1/test-elements/${queryArg}` }),
        providesTags: ['v1-test-elements'],
      }),
      testElementUpdateById: build.mutation<
        TestElementUpdateByIdApiResponse,
        TestElementUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/test-elements/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.testElementUpdateRequestDto,
        }),
        invalidatesTags: ['v1-test-elements'],
      }),
      testElementDeleteById: build.mutation<
        TestElementDeleteByIdApiResponse,
        TestElementDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/test-elements/${queryArg}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['v1-test-elements'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as testElementApi }
export type TestElementSearchApiResponse =
  /** status 200  */ TestElementSearchResponseDto
export type TestElementSearchApiArg = TestElementSearchRequestDto
export type TestElementCreateApiResponse =
  /** status 201  */ TestElementUnpopulatedResponseDto
export type TestElementCreateApiArg = TestElementCreateRequestDto
export type TestElementFindByIdApiResponse =
  /** status 200  */ TestElementResponseDto
export type TestElementFindByIdApiArg = string
export type TestElementUpdateByIdApiResponse =
  /** status 200  */ TestElementUnpopulatedResponseDto
export type TestElementUpdateByIdApiArg = {
  id: string
  testElementUpdateRequestDto: TestElementUpdateRequestDto
}
export type TestElementDeleteByIdApiResponse =
  /** status 200  */ TestElementUnpopulatedResponseDto
export type TestElementDeleteByIdApiArg = string
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
export type TestUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  shouldDisplayWithChildren: boolean
  bioProductId: string | null
  instrumentId: string | null
  sampleTypeId: string | null
  testCategoryId: string
  printFormId: string | null
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
export type TestElementResponseDto = {
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
  test?: TestUnpopulatedResponseDto | null
  branch?: BranchUnpopulatedResponseDto | null
}
export type TestElementSearchResponseDto = {
  total: number
  offset: number
  limit: number
  items: TestElementResponseDto[]
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
export type TestElementSearchRequestDto = {
  offset?: number
  limit?: number
  sort?: object
  filter?: object
  populates?: PopulateOptionDto[]
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
export type TestElementCreateRequestDto = {
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
export type TestElementUpdateRequestDto = {
  displayIndex?: number
  name?: string
  printIndex?: number
  reportIndex?: number
  unit?: string
  isParent?: boolean
  normalRules?: TestElementNormalRuleDto[]
  testId?: string
  branchId?: string
}
export const {
  useTestElementSearchQuery,
  useLazyTestElementSearchQuery,
  useTestElementCreateMutation,
  useTestElementFindByIdQuery,
  useLazyTestElementFindByIdQuery,
  useTestElementUpdateByIdMutation,
  useTestElementDeleteByIdMutation,
} = injectedRtkApi
