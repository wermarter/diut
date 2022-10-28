import { apiSlice as api } from './slice'
export const addTagTypes = ['test-categories'] as const
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
          url: `/api/test-categories/search`,
          method: 'POST',
          body: queryArg.searchTestCategoryRequestDto,
        }),
        providesTags: ['test-categories'],
      }),
      testCategoryCreate: build.mutation<
        TestCategoryCreateApiResponse,
        TestCategoryCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/test-categories`,
          method: 'POST',
          body: queryArg.createTestCategoryRequestDto,
        }),
        invalidatesTags: ['test-categories'],
      }),
      testCategoryUpdateById: build.mutation<
        TestCategoryUpdateByIdApiResponse,
        TestCategoryUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/test-categories/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.updateTestCategoryRequestDto,
        }),
        invalidatesTags: ['test-categories'],
      }),
      testCategoryFindById: build.query<
        TestCategoryFindByIdApiResponse,
        TestCategoryFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/test-categories/${queryArg.id}` }),
        providesTags: ['test-categories'],
      }),
      testCategoryDeleteById: build.mutation<
        TestCategoryDeleteByIdApiResponse,
        TestCategoryDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/test-categories/${queryArg.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['test-categories'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as testCategoryApi }
export type TestCategorySearchApiResponse =
  /** status 200  */ SearchTestCategoryResponseDto
export type TestCategorySearchApiArg = {
  searchTestCategoryRequestDto: SearchTestCategoryRequestDto
}
export type TestCategoryCreateApiResponse =
  /** status 201  */ TestCategoryResponseDto
export type TestCategoryCreateApiArg = {
  createTestCategoryRequestDto: CreateTestCategoryRequestDto
}
export type TestCategoryUpdateByIdApiResponse =
  /** status 200  */ TestCategoryResponseDto
export type TestCategoryUpdateByIdApiArg = {
  id: string
  updateTestCategoryRequestDto: UpdateTestCategoryRequestDto
}
export type TestCategoryFindByIdApiResponse =
  /** status 200  */ TestCategoryResponseDto
export type TestCategoryFindByIdApiArg = {
  id: string
}
export type TestCategoryDeleteByIdApiResponse =
  /** status 200  */ TestCategoryResponseDto
export type TestCategoryDeleteByIdApiArg = {
  id: string
}
export type TestCategoryResponseDto = {
  _id: string
  createdAt: string
  updatedAt: string
  name: string
  index: number
}
export type SearchTestCategoryResponseDto = {
  total: number
  offset: number
  limit: number
  items: TestCategoryResponseDto[]
}
export type SearchTestCategoryRequestDto = {
  offset?: number
  limit?: number
  sort?: object
  filter?: object
}
export type CreateTestCategoryRequestDto = {
  name: string
  index: number
}
export type UpdateTestCategoryRequestDto = {
  name?: string
  index?: number
}
export const {
  useTestCategorySearchQuery,
  useLazyTestCategorySearchQuery,
  useTestCategoryCreateMutation,
  useTestCategoryUpdateByIdMutation,
  useTestCategoryFindByIdQuery,
  useLazyTestCategoryFindByIdQuery,
  useTestCategoryDeleteByIdMutation,
} = injectedRtkApi
