import { apiSlice as api } from './slice'
export const addTagTypes = ['doctors'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      doctorSearch: build.query<DoctorSearchApiResponse, DoctorSearchApiArg>({
        query: (queryArg) => ({
          url: `/api/doctors/search`,
          method: 'POST',
          body: queryArg.searchDoctorRequestDto,
        }),
        providesTags: ['doctors'],
      }),
      doctorCreate: build.mutation<DoctorCreateApiResponse, DoctorCreateApiArg>(
        {
          query: (queryArg) => ({
            url: `/api/doctors`,
            method: 'POST',
            body: queryArg.createDoctorRequestDto,
          }),
          invalidatesTags: ['doctors'],
        },
      ),
      doctorUpdateById: build.mutation<
        DoctorUpdateByIdApiResponse,
        DoctorUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/doctors/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.updateDoctorRequestDto,
        }),
        invalidatesTags: ['doctors'],
      }),
      doctorFindById: build.query<
        DoctorFindByIdApiResponse,
        DoctorFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/doctors/${queryArg.id}` }),
        providesTags: ['doctors'],
      }),
      doctorDeleteById: build.mutation<
        DoctorDeleteByIdApiResponse,
        DoctorDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/doctors/${queryArg.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['doctors'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as doctorApi }
export type DoctorSearchApiResponse = /** status 200  */ SearchDoctorResponseDto
export type DoctorSearchApiArg = {
  searchDoctorRequestDto: SearchDoctorRequestDto
}
export type DoctorCreateApiResponse = /** status 201  */ DoctorResponseDto
export type DoctorCreateApiArg = {
  createDoctorRequestDto: CreateDoctorRequestDto
}
export type DoctorUpdateByIdApiResponse = /** status 200  */ DoctorResponseDto
export type DoctorUpdateByIdApiArg = {
  id: string
  updateDoctorRequestDto: UpdateDoctorRequestDto
}
export type DoctorFindByIdApiResponse = /** status 200  */ DoctorResponseDto
export type DoctorFindByIdApiArg = {
  id: string
}
export type DoctorDeleteByIdApiResponse = /** status 200  */ DoctorResponseDto
export type DoctorDeleteByIdApiArg = {
  id: string
}
export type DoctorResponseDto = {
  _id: string
  createdAt: string
  updatedAt: string
  name: string
  index: number
}
export type SearchDoctorResponseDto = {
  total: number
  offset: number
  limit: number
  items: DoctorResponseDto[]
}
export type SearchDoctorRequestDto = {
  offset?: number
  limit?: number
  sort?: object
  filter?: object
}
export type CreateDoctorRequestDto = {
  name: string
  index: number
}
export type UpdateDoctorRequestDto = {
  name?: string
  index?: number
}
export const {
  useDoctorSearchQuery,
  useLazyDoctorSearchQuery,
  useDoctorCreateMutation,
  useDoctorUpdateByIdMutation,
  useDoctorFindByIdQuery,
  useLazyDoctorFindByIdQuery,
  useDoctorDeleteByIdMutation,
} = injectedRtkApi
