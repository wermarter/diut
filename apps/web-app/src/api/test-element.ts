import { apiSlice as api } from './slice'
export const addTagTypes = ['test-elements', 'tests'] as const
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
          url: `/api/test-elements/search`,
          method: 'POST',
          body: queryArg.searchTestElementRequestDto,
        }),
        providesTags: ['test-elements', 'tests'],
      }),
      testElementCreate: build.mutation<
        TestElementCreateApiResponse,
        TestElementCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/test-elements`,
          method: 'POST',
          body: queryArg.createTestElementRequestDto,
        }),
        invalidatesTags: ['test-elements'],
      }),
      testElementUpdateById: build.mutation<
        TestElementUpdateByIdApiResponse,
        TestElementUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/test-elements/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.updateTestElementRequestDto,
        }),
        invalidatesTags: ['test-elements'],
      }),
      testElementFindById: build.query<
        TestElementFindByIdApiResponse,
        TestElementFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/test-elements/${queryArg.id}` }),
        providesTags: ['test-elements'],
      }),
      testElementDeleteById: build.mutation<
        TestElementDeleteByIdApiResponse,
        TestElementDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/test-elements/${queryArg.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['test-elements'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as testElementApi }
export type TestElementSearchApiResponse =
  /** status 200  */ SearchTestElementResponseDto
export type TestElementSearchApiArg = {
  searchTestElementRequestDto: SearchTestElementRequestDto
}
export type TestElementCreateApiResponse =
  /** status 201  */ TestElementResponseDto
export type TestElementCreateApiArg = {
  createTestElementRequestDto: CreateTestElementRequestDto
}
export type TestElementUpdateByIdApiResponse =
  /** status 200  */ TestElementResponseDto
export type TestElementUpdateByIdApiArg = {
  id: string
  updateTestElementRequestDto: UpdateTestElementRequestDto
}
export type TestElementFindByIdApiResponse =
  /** status 200  */ TestElementResponseDto
export type TestElementFindByIdApiArg = {
  id: string
}
export type TestElementDeleteByIdApiResponse =
  /** status 200  */ TestElementResponseDto
export type TestElementDeleteByIdApiArg = {
  id: string
}
export type TestCategoryResponseDto = {
  _id: string
  createdAt: string
  updatedAt: string
  name: string
  leftRightIndex: number
}
export type TestResponseDto = {
  _id: string
  createdAt: string
  updatedAt: string
  category: TestCategoryResponseDto
  name: string
  topBottomIndex: number
}
export type TestElementResponseDto = {
  _id: string
  createdAt: string
  updatedAt: string
  name: string
  test: TestResponseDto
  topBottomIndex: number
  highlightRule: object
  unit?: string
  notice?: string
}
export type SearchTestElementResponseDto = {
  total: number
  offset: number
  limit: number
  items: TestElementResponseDto[]
}
export type SearchTestElementRequestDto = {
  offset?: number
  limit?: number
  sort?: object
  filter?: object
}
export type CreateTestElementRequestDto = {
  name: string
  test: string
  topBottomIndex: number
  highlightRule: object
  unit?: string
  notice?: string
}
export type UpdateTestElementRequestDto = {
  name?: string
  test?: string
  topBottomIndex?: number
  highlightRule?: object
  unit?: string
  notice?: string
}
export const {
  useTestElementSearchQuery,
  useLazyTestElementSearchQuery,
  useTestElementCreateMutation,
  useTestElementUpdateByIdMutation,
  useTestElementFindByIdQuery,
  useLazyTestElementFindByIdQuery,
  useTestElementDeleteByIdMutation,
} = injectedRtkApi
