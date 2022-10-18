import { apiSlice as api } from './slice'
export const addTagTypes = ['sample-types'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      sampleTypeSearch: build.query<
        SampleTypeSearchApiResponse,
        SampleTypeSearchApiArg
      >({
        query: (queryArg) => ({
          url: `/api/sample-types/search`,
          method: 'POST',
          body: queryArg.searchSampleTypeRequestDto,
        }),
        invalidatesTags: ['sample-types'],
      }),
      sampleTypeCreate: build.mutation<
        SampleTypeCreateApiResponse,
        SampleTypeCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/sample-types`,
          method: 'POST',
          body: queryArg.createSampleTypeRequestDto,
        }),
        invalidatesTags: ['sample-types'],
      }),
      sampleTypeUpdateById: build.mutation<
        SampleTypeUpdateByIdApiResponse,
        SampleTypeUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/sample-types/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.updateSampleTypeRequestDto,
        }),
        invalidatesTags: ['sample-types'],
      }),
      sampleTypeFindById: build.query<
        SampleTypeFindByIdApiResponse,
        SampleTypeFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/sample-types/${queryArg.id}` }),
        providesTags: ['sample-types'],
      }),
      sampleTypeDeleteById: build.mutation<
        SampleTypeDeleteByIdApiResponse,
        SampleTypeDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/sample-types/${queryArg.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['sample-types'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as sampleTypeApi }
export type SampleTypeSearchApiResponse =
  /** status 200  */ SearchSampleTypeResponseDto
export type SampleTypeSearchApiArg = {
  searchSampleTypeRequestDto: SearchSampleTypeRequestDto
}
export type SampleTypeCreateApiResponse =
  /** status 201  */ SampleTypeResponseDto
export type SampleTypeCreateApiArg = {
  createSampleTypeRequestDto: CreateSampleTypeRequestDto
}
export type SampleTypeUpdateByIdApiResponse =
  /** status 200  */ SampleTypeResponseDto
export type SampleTypeUpdateByIdApiArg = {
  id: string
  updateSampleTypeRequestDto: UpdateSampleTypeRequestDto
}
export type SampleTypeFindByIdApiResponse =
  /** status 200  */ SampleTypeResponseDto
export type SampleTypeFindByIdApiArg = {
  id: string
}
export type SampleTypeDeleteByIdApiResponse =
  /** status 200  */ SampleTypeResponseDto
export type SampleTypeDeleteByIdApiArg = {
  id: string
}
export type SampleTypeResponseDto = {
  _id: string
  createdAt: string
  updatedAt: string
  name: string
  leftRightIndex: number
}
export type SearchSampleTypeResponseDto = {
  total: number
  offset: number
  limit: number
  items: SampleTypeResponseDto[]
}
export type SearchSampleTypeRequestDto = {
  offset?: number
  limit?: number
  sort?: object
  filter?: object
}
export type CreateSampleTypeRequestDto = {
  name: string
  leftRightIndex: number
}
export type UpdateSampleTypeRequestDto = {
  name?: string
  leftRightIndex?: number
}
export const {
  useLazySampleTypeSearchQuery,
  useSampleTypeSearchQuery,
  useSampleTypeCreateMutation,
  useSampleTypeUpdateByIdMutation,
  useSampleTypeFindByIdQuery,
  useLazySampleTypeFindByIdQuery,
  useSampleTypeDeleteByIdMutation,
} = injectedRtkApi
