import { apiSlice as api } from './slice'
export const addTagTypes = ['bio-products'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      bioProductSearch: build.query<
        BioProductSearchApiResponse,
        BioProductSearchApiArg
      >({
        query: (queryArg) => ({
          url: `/api/bio-products/search`,
          method: 'POST',
          body: queryArg.searchBioProductRequestDto,
        }),
        providesTags: ['bio-products'],
      }),
      bioProductCreate: build.mutation<
        BioProductCreateApiResponse,
        BioProductCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/bio-products`,
          method: 'POST',
          body: queryArg.createBioProductRequestDto,
        }),
        invalidatesTags: ['bio-products'],
      }),
      bioProductUpdateById: build.mutation<
        BioProductUpdateByIdApiResponse,
        BioProductUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/bio-products/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.updateBioProductRequestDto,
        }),
        invalidatesTags: ['bio-products'],
      }),
      bioProductFindById: build.query<
        BioProductFindByIdApiResponse,
        BioProductFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/bio-products/${queryArg.id}` }),
        providesTags: ['bio-products'],
      }),
      bioProductDeleteById: build.mutation<
        BioProductDeleteByIdApiResponse,
        BioProductDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/bio-products/${queryArg.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['bio-products'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as bioProductApi }
export type BioProductSearchApiResponse =
  /** status 200  */ SearchBioProductResponseDto
export type BioProductSearchApiArg = {
  searchBioProductRequestDto: SearchBioProductRequestDto
}
export type BioProductCreateApiResponse =
  /** status 201  */ BioProductResponseDto
export type BioProductCreateApiArg = {
  createBioProductRequestDto: CreateBioProductRequestDto
}
export type BioProductUpdateByIdApiResponse =
  /** status 200  */ BioProductResponseDto
export type BioProductUpdateByIdApiArg = {
  id: string
  updateBioProductRequestDto: UpdateBioProductRequestDto
}
export type BioProductFindByIdApiResponse =
  /** status 200  */ BioProductResponseDto
export type BioProductFindByIdApiArg = {
  id: string
}
export type BioProductDeleteByIdApiResponse =
  /** status 200  */ BioProductResponseDto
export type BioProductDeleteByIdApiArg = {
  id: string
}
export type BioProductResponseDto = {
  _id: string
  createdAt: string
  updatedAt: string
  name: string
  leftRightIndex: number
}
export type SearchBioProductResponseDto = {
  total: number
  offset: number
  limit: number
  items: BioProductResponseDto[]
}
export type SearchBioProductRequestDto = {
  offset?: number
  limit?: number
  sort?: object
  filter?: object
}
export type CreateBioProductRequestDto = {
  name: string
  leftRightIndex: number
}
export type UpdateBioProductRequestDto = {
  name?: string
  leftRightIndex?: number
}
export const {
  useBioProductSearchQuery,
  useLazyBioProductSearchQuery,
  useBioProductCreateMutation,
  useBioProductUpdateByIdMutation,
  useBioProductFindByIdQuery,
  useLazyBioProductFindByIdQuery,
  useBioProductDeleteByIdMutation,
} = injectedRtkApi
