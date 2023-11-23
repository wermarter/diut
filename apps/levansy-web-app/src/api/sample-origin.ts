import { apiSlice as api } from './slice'
export const addTagTypes = ['sample-origins'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      sampleOriginSearch: build.query<
        SampleOriginSearchApiResponse,
        SampleOriginSearchApiArg
      >({
        query: (queryArg) => ({
          url: `/api/sample-origins/search`,
          method: 'POST',
          body: queryArg.searchSampleOriginRequestDto,
        }),
        providesTags: ['sample-origins'],
      }),
      sampleOriginCreate: build.mutation<
        SampleOriginCreateApiResponse,
        SampleOriginCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/sample-origins`,
          method: 'POST',
          body: queryArg.createSampleOriginRequestDto,
        }),
        invalidatesTags: ['sample-origins'],
      }),
      sampleOriginUpdateById: build.mutation<
        SampleOriginUpdateByIdApiResponse,
        SampleOriginUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/sample-origins/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.updateSampleOriginRequestDto,
        }),
        invalidatesTags: ['sample-origins'],
      }),
      sampleOriginFindById: build.query<
        SampleOriginFindByIdApiResponse,
        SampleOriginFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/sample-origins/${queryArg.id}` }),
        providesTags: ['sample-origins'],
      }),
      sampleOriginDeleteById: build.mutation<
        SampleOriginDeleteByIdApiResponse,
        SampleOriginDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/sample-origins/${queryArg.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['sample-origins'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as sampleOriginApi }
export type SampleOriginSearchApiResponse =
  /** status 200  */ SearchSampleOriginResponseDto
export type SampleOriginSearchApiArg = {
  searchSampleOriginRequestDto: SearchSampleOriginRequestDto
}
export type SampleOriginCreateApiResponse =
  /** status 201  */ SampleOriginResponseDto
export type SampleOriginCreateApiArg = {
  createSampleOriginRequestDto: CreateSampleOriginRequestDto
}
export type SampleOriginUpdateByIdApiResponse =
  /** status 200  */ SampleOriginResponseDto
export type SampleOriginUpdateByIdApiArg = {
  id: string
  updateSampleOriginRequestDto: UpdateSampleOriginRequestDto
}
export type SampleOriginFindByIdApiResponse =
  /** status 200  */ SampleOriginResponseDto
export type SampleOriginFindByIdApiArg = {
  id: string
}
export type SampleOriginDeleteByIdApiResponse =
  /** status 200  */ SampleOriginResponseDto
export type SampleOriginDeleteByIdApiArg = {
  id: string
}
export type SampleOriginResponseDto = {
  _id: string
  createdAt: string
  updatedAt: string
  name: string
  index: number
}
export type SearchSampleOriginResponseDto = {
  total: number
  offset: number
  limit: number
  items: SampleOriginResponseDto[]
}
export type SearchSampleOriginRequestDto = {
  offset?: number
  limit?: number
  sort?: object
  filter?: object
}
export type CreateSampleOriginRequestDto = {
  name: string
  index: number
}
export type UpdateSampleOriginRequestDto = {
  name?: string
  index?: number
}
export const {
  useSampleOriginSearchQuery,
  useLazySampleOriginSearchQuery,
  useSampleOriginCreateMutation,
  useSampleOriginUpdateByIdMutation,
  useSampleOriginFindByIdQuery,
  useLazySampleOriginFindByIdQuery,
  useSampleOriginDeleteByIdMutation,
} = injectedRtkApi
