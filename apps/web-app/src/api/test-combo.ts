import { apiSlice as api } from './slice'
export const addTagTypes = ['test-combos'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      testComboSearch: build.mutation<
        TestComboSearchApiResponse,
        TestComboSearchApiArg
      >({
        query: (queryArg) => ({
          url: `/api/test-combos/search`,
          method: 'POST',
          body: queryArg.searchTestComboRequestDto,
        }),
        invalidatesTags: ['test-combos'],
      }),
      testComboCreate: build.mutation<
        TestComboCreateApiResponse,
        TestComboCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/test-combos`,
          method: 'POST',
          body: queryArg.createTestComboRequestDto,
        }),
        invalidatesTags: ['test-combos'],
      }),
      testComboUpdateById: build.mutation<
        TestComboUpdateByIdApiResponse,
        TestComboUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/test-combos/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.updateTestComboRequestDto,
        }),
        invalidatesTags: ['test-combos'],
      }),
      testComboFindById: build.query<
        TestComboFindByIdApiResponse,
        TestComboFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/test-combos/${queryArg.id}` }),
        providesTags: ['test-combos'],
      }),
      testComboDeleteById: build.mutation<
        TestComboDeleteByIdApiResponse,
        TestComboDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/test-combos/${queryArg.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['test-combos'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as enhancedApi }
export type TestComboSearchApiResponse =
  /** status 200  */ SearchTestComboResponseDto
export type TestComboSearchApiArg = {
  searchTestComboRequestDto: SearchTestComboRequestDto
}
export type TestComboCreateApiResponse = /** status 201  */ TestComboResponseDto
export type TestComboCreateApiArg = {
  createTestComboRequestDto: CreateTestComboRequestDto
}
export type TestComboUpdateByIdApiResponse =
  /** status 200  */ TestComboResponseDto
export type TestComboUpdateByIdApiArg = {
  id: string
  updateTestComboRequestDto: UpdateTestComboRequestDto
}
export type TestComboFindByIdApiResponse =
  /** status 200  */ TestComboResponseDto
export type TestComboFindByIdApiArg = {
  id: string
}
export type TestComboDeleteByIdApiResponse =
  /** status 200  */ TestComboResponseDto
export type TestComboDeleteByIdApiArg = {
  id: string
}
export type TestComboResponseDto = {
  _id: string
  createdAt: string
  updatedAt: string
  name: string
  children: string[]
}
export type SearchTestComboResponseDto = {
  total: number
  offset: number
  limit: number
  items: TestComboResponseDto[]
}
export type SearchTestComboRequestDto = {
  offset?: number
  limit?: number
  sort?: object
  filter?: object
}
export type CreateTestComboRequestDto = {
  name: string
  children: string[]
}
export type UpdateTestComboRequestDto = {
  name?: string
  children?: string[]
}
export const {
  useTestComboSearchMutation,
  useTestComboCreateMutation,
  useTestComboUpdateByIdMutation,
  useTestComboFindByIdQuery,
  useLazyTestComboFindByIdQuery,
  useTestComboDeleteByIdMutation,
} = injectedRtkApi
