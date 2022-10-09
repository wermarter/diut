import { emptySplitApi as api } from './slice'
export const addTagTypes = ['patient-types'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      patientTypeSearch: build.mutation<
        PatientTypeSearchApiResponse,
        PatientTypeSearchApiArg
      >({
        query: (queryArg) => ({
          url: `/api/patient-types/search`,
          method: 'POST',
          body: queryArg.searchPatientTypeRequestDto,
        }),
        invalidatesTags: ['patient-types'],
      }),
      patientTypeCreate: build.mutation<
        PatientTypeCreateApiResponse,
        PatientTypeCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/patient-types`,
          method: 'POST',
          body: queryArg.createPatientTypeRequestDto,
        }),
        invalidatesTags: ['patient-types'],
      }),
      patientTypeUpdateById: build.mutation<
        PatientTypeUpdateByIdApiResponse,
        PatientTypeUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/patient-types/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.updatePatientTypeRequestDto,
        }),
        invalidatesTags: ['patient-types'],
      }),
      patientTypeFindById: build.query<
        PatientTypeFindByIdApiResponse,
        PatientTypeFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/patient-types/${queryArg.id}` }),
        providesTags: ['patient-types'],
      }),
      patientTypeDeleteById: build.mutation<
        PatientTypeDeleteByIdApiResponse,
        PatientTypeDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/patient-types/${queryArg.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['patient-types'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as enhancedApi }
export type PatientTypeSearchApiResponse =
  /** status 200  */ SearchPatientTypeResponseDto
export type PatientTypeSearchApiArg = {
  searchPatientTypeRequestDto: SearchPatientTypeRequestDto
}
export type PatientTypeCreateApiResponse =
  /** status 201  */ PatientTypeResponseDto
export type PatientTypeCreateApiArg = {
  createPatientTypeRequestDto: CreatePatientTypeRequestDto
}
export type PatientTypeUpdateByIdApiResponse =
  /** status 200  */ PatientTypeResponseDto
export type PatientTypeUpdateByIdApiArg = {
  id: string
  updatePatientTypeRequestDto: UpdatePatientTypeRequestDto
}
export type PatientTypeFindByIdApiResponse =
  /** status 200  */ PatientTypeResponseDto
export type PatientTypeFindByIdApiArg = {
  id: string
}
export type PatientTypeDeleteByIdApiResponse =
  /** status 200  */ PatientTypeResponseDto
export type PatientTypeDeleteByIdApiArg = {
  id: string
}
export type PatientTypeResponseDto = {
  _id: string
  createdAt: string
  updatedAt: string
  name: string
}
export type SearchPatientTypeResponseDto = {
  total: number
  offset: number
  limit: number
  items: PatientTypeResponseDto[]
}
export type SearchPatientTypeRequestDto = {
  offset?: number
  limit?: number
  sort?: object
  filter?: object
}
export type CreatePatientTypeRequestDto = {
  name: string
}
export type UpdatePatientTypeRequestDto = {
  name?: string
}
export const {
  usePatientTypeSearchMutation,
  usePatientTypeCreateMutation,
  usePatientTypeUpdateByIdMutation,
  usePatientTypeFindByIdQuery,
  usePatientTypeDeleteByIdMutation,
} = injectedRtkApi
