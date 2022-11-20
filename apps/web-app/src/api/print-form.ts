import { apiSlice as api } from './slice'
export const addTagTypes = ['print-forms'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      printFormSearch: build.query<
        PrintFormSearchApiResponse,
        PrintFormSearchApiArg
      >({
        query: (queryArg) => ({
          url: `/api/print-forms/search`,
          method: 'POST',
          body: queryArg.searchPrintFormRequestDto,
        }),
        providesTags: ['print-forms'],
      }),
      printFormCreate: build.mutation<
        PrintFormCreateApiResponse,
        PrintFormCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/print-forms`,
          method: 'POST',
          body: queryArg.createPrintFormRequestDto,
        }),
        invalidatesTags: ['print-forms'],
      }),
      printFormUpdateById: build.mutation<
        PrintFormUpdateByIdApiResponse,
        PrintFormUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/print-forms/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.updatePrintFormRequestDto,
        }),
        invalidatesTags: ['print-forms'],
      }),
      printFormFindById: build.query<
        PrintFormFindByIdApiResponse,
        PrintFormFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/print-forms/${queryArg.id}` }),
        providesTags: ['print-forms'],
      }),
      printFormDeleteById: build.mutation<
        PrintFormDeleteByIdApiResponse,
        PrintFormDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/print-forms/${queryArg.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['print-forms'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as printFormApi }
export type PrintFormSearchApiResponse =
  /** status 200  */ SearchPrintFormResponseDto
export type PrintFormSearchApiArg = {
  searchPrintFormRequestDto: SearchPrintFormRequestDto
}
export type PrintFormCreateApiResponse = /** status 201  */ PrintFormResponseDto
export type PrintFormCreateApiArg = {
  createPrintFormRequestDto: CreatePrintFormRequestDto
}
export type PrintFormUpdateByIdApiResponse =
  /** status 200  */ PrintFormResponseDto
export type PrintFormUpdateByIdApiArg = {
  id: string
  updatePrintFormRequestDto: UpdatePrintFormRequestDto
}
export type PrintFormFindByIdApiResponse =
  /** status 200  */ PrintFormResponseDto
export type PrintFormFindByIdApiArg = {
  id: string
}
export type PrintFormDeleteByIdApiResponse =
  /** status 200  */ PrintFormResponseDto
export type PrintFormDeleteByIdApiArg = {
  id: string
}
export type PrintFormResponseDto = {
  _id: string
  createdAt: string
  updatedAt: string
  name: string
  index: number
  isAuthorLocked: boolean
  authorPosition: string
  authorName: string
}
export type SearchPrintFormResponseDto = {
  total: number
  offset: number
  limit: number
  items: PrintFormResponseDto[]
}
export type SearchPrintFormRequestDto = {
  offset?: number
  limit?: number
  sort?: object
  filter?: object
}
export type CreatePrintFormRequestDto = {
  name: string
  index: number
  isAuthorLocked: boolean
  authorPosition: string
  authorName: string
}
export type UpdatePrintFormRequestDto = {
  name?: string
  index?: number
  isAuthorLocked?: boolean
  authorPosition?: string
  authorName?: string
}
export const {
  usePrintFormSearchQuery,
  useLazyPrintFormSearchQuery,
  usePrintFormCreateMutation,
  usePrintFormUpdateByIdMutation,
  usePrintFormFindByIdQuery,
  useLazyPrintFormFindByIdQuery,
  usePrintFormDeleteByIdMutation,
} = injectedRtkApi
