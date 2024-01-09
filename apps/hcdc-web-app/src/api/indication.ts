import { apiSlice as api } from './slice'
export const addTagTypes = ['indications'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      indicationSearch: build.query<
        IndicationSearchApiResponse,
        IndicationSearchApiArg
      >({
        query: (queryArg) => ({
          url: `/api/indications/search`,
          method: 'POST',
          body: queryArg.searchIndicationRequestDto,
        }),
        providesTags: ['indications'],
      }),
      indicationCreate: build.mutation<
        IndicationCreateApiResponse,
        IndicationCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/indications`,
          method: 'POST',
          body: queryArg.createIndicationRequestDto,
        }),
        invalidatesTags: ['indications'],
      }),
      indicationUpdateById: build.mutation<
        IndicationUpdateByIdApiResponse,
        IndicationUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/indications/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.updateIndicationRequestDto,
        }),
        invalidatesTags: ['indications'],
      }),
      indicationFindById: build.query<
        IndicationFindByIdApiResponse,
        IndicationFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/indications/${queryArg.id}` }),
        providesTags: ['indications'],
      }),
      indicationDeleteById: build.mutation<
        IndicationDeleteByIdApiResponse,
        IndicationDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/indications/${queryArg.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['indications'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as indicationApi }
export type IndicationSearchApiResponse =
  /** status 200  */ SearchIndicationResponseDto
export type IndicationSearchApiArg = {
  searchIndicationRequestDto: SearchIndicationRequestDto
}
export type IndicationCreateApiResponse =
  /** status 201  */ IndicationResponseDto
export type IndicationCreateApiArg = {
  createIndicationRequestDto: CreateIndicationRequestDto
}
export type IndicationUpdateByIdApiResponse =
  /** status 200  */ IndicationResponseDto
export type IndicationUpdateByIdApiArg = {
  id: string
  updateIndicationRequestDto: UpdateIndicationRequestDto
}
export type IndicationFindByIdApiResponse =
  /** status 200  */ IndicationResponseDto
export type IndicationFindByIdApiArg = {
  id: string
}
export type IndicationDeleteByIdApiResponse =
  /** status 200  */ IndicationResponseDto
export type IndicationDeleteByIdApiArg = {
  id: string
}
export type IndicationResponseDto = {
  _id: string
  createdAt: string
  updatedAt: string
  name: string
  index: number
}
export type SearchIndicationResponseDto = {
  total: number
  offset: number
  limit: number
  items: IndicationResponseDto[]
}
export type SearchIndicationRequestDto = {
  offset?: number
  limit?: number
  sort?: object
  filter?: object
}
export type CreateIndicationRequestDto = {
  name: string
  index: number
}
export type UpdateIndicationRequestDto = {
  name?: string
  index?: number
}
export const {
  useIndicationSearchQuery,
  useLazyIndicationSearchQuery,
  useIndicationCreateMutation,
  useIndicationUpdateByIdMutation,
  useIndicationFindByIdQuery,
  useLazyIndicationFindByIdQuery,
  useIndicationDeleteByIdMutation,
} = injectedRtkApi
