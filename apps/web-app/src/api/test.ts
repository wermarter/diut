import { PrintForm } from '@diut/bathanghai-common'
import { BioProductResponseDto } from './bio-product'
import { apiSlice as api } from './slice'
import { TestCategoryResponseDto } from './test-category'
export const addTagTypes = ['tests', 'test-categories', 'bio-products'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      testSearch: build.query<TestSearchApiResponse, TestSearchApiArg>({
        query: (queryArg) => ({
          url: `/api/tests/search`,
          method: 'POST',
          body: queryArg.searchTestRequestDto,
        }),
        providesTags: ['tests', 'test-categories', 'bio-products'],
      }),
      testCreate: build.mutation<TestCreateApiResponse, TestCreateApiArg>({
        query: (queryArg) => ({
          url: `/api/tests`,
          method: 'POST',
          body: queryArg.createTestRequestDto,
        }),
        invalidatesTags: ['tests'],
      }),
      testUpdateById: build.mutation<
        TestUpdateByIdApiResponse,
        TestUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/tests/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.updateTestRequestDto,
        }),
        invalidatesTags: ['tests'],
      }),
      testFindById: build.query<TestFindByIdApiResponse, TestFindByIdApiArg>({
        query: (queryArg) => ({ url: `/api/tests/${queryArg.id}` }),
        providesTags: ['tests'],
      }),
      testDeleteById: build.mutation<
        TestDeleteByIdApiResponse,
        TestDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/tests/${queryArg.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['tests'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as testApi }
export type TestSearchApiResponse = /** status 200  */ SearchTestResponseDto
export type TestSearchApiArg = {
  searchTestRequestDto: SearchTestRequestDto
}
export type TestCreateApiResponse = /** status 201  */ TestResponseDto
export type TestCreateApiArg = {
  createTestRequestDto: CreateTestRequestDto
}
export type TestUpdateByIdApiResponse = /** status 200  */ TestResponseDto
export type TestUpdateByIdApiArg = {
  id: string
  updateTestRequestDto: UpdateTestRequestDto
}
export type TestFindByIdApiResponse = /** status 200  */ TestResponseDto
export type TestFindByIdApiArg = {
  id: string
}
export type TestDeleteByIdApiResponse = /** status 200  */ TestResponseDto
export type TestDeleteByIdApiArg = {
  id: string
}
export type TestResponseDto = {
  _id: string
  createdAt: string
  updatedAt: string
  category: TestCategoryResponseDto
  bioProduct?: BioProductResponseDto
  name: string
  index: number
  printForm: PrintForm
  shouldNotPrint: boolean
}
export type SearchTestResponseDto = {
  total: number
  offset: number
  limit: number
  items: TestResponseDto[]
}
export type SearchTestRequestDto = {
  offset?: number
  limit?: number
  sort?: object
  filter?: object
}
export type CreateTestRequestDto = {
  category: string
  bioProduct?: string
  name: string
  index: number
  printForm: PrintForm
  shouldNotPrint: boolean
}
export type UpdateTestRequestDto = {
  category?: string
  bioProduct?: string
  name?: string
  index?: number
  printForm?: PrintForm
  shouldNotPrint?: boolean
}
export const {
  useTestSearchQuery,
  useLazyTestSearchQuery,
  useTestCreateMutation,
  useTestUpdateByIdMutation,
  useTestFindByIdQuery,
  useLazyTestFindByIdQuery,
  useTestDeleteByIdMutation,
} = injectedRtkApi
