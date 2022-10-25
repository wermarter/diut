import { apiSlice as api } from './slice'
export const addTagTypes = ['patients'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      patientSearch: build.query<PatientSearchApiResponse, PatientSearchApiArg>(
        {
          query: (queryArg) => ({
            url: `/api/patients/search`,
            method: 'POST',
            body: queryArg.searchPatientRequestDto,
          }),
          providesTags: ['patients'],
        }
      ),
      patientCreate: build.mutation<
        PatientCreateApiResponse,
        PatientCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/patients`,
          method: 'POST',
          body: queryArg.createPatientRequestDto,
        }),
        invalidatesTags: ['patients'],
      }),
      patientUpdateById: build.mutation<
        PatientUpdateByIdApiResponse,
        PatientUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/patients/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.updatePatientRequestDto,
        }),
        invalidatesTags: ['patients'],
      }),
      patientUpsertById: build.mutation<
        PatientUpsertByIdApiResponse,
        PatientUpsertByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/patients/${queryArg.id}`,
          method: 'PUT',
          body: queryArg.createPatientRequestDto,
        }),
        invalidatesTags: ['patients'],
      }),
      patientFindById: build.query<
        PatientFindByIdApiResponse,
        PatientFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/patients/${queryArg.id}` }),
        providesTags: ['patients'],
      }),
      patientDeleteById: build.mutation<
        PatientDeleteByIdApiResponse,
        PatientDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/patients/${queryArg.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['patients'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as patientApi }
export type PatientSearchApiResponse =
  /** status 200  */ SearchPatientResponseDto
export type PatientSearchApiArg = {
  searchPatientRequestDto: SearchPatientRequestDto
}
export type PatientCreateApiResponse = /** status 201  */ PatientResponseDto
export type PatientCreateApiArg = {
  createPatientRequestDto: CreatePatientRequestDto
}
export type PatientUpdateByIdApiResponse = /** status 200  */ PatientResponseDto
export type PatientUpdateByIdApiArg = {
  id: string
  updatePatientRequestDto: UpdatePatientRequestDto
}
export type PatientUpsertByIdApiResponse = /** status 200  */ PatientResponseDto
export type PatientUpsertByIdApiArg = {
  id: string
  createPatientRequestDto: CreatePatientRequestDto
}
export type PatientFindByIdApiResponse = /** status 200  */ PatientResponseDto
export type PatientFindByIdApiArg = {
  id: string
}
export type PatientDeleteByIdApiResponse = /** status 200  */ PatientResponseDto
export type PatientDeleteByIdApiArg = {
  id: string
}
export type PatientResponseDto = {
  _id: string
  createdAt: string
  updatedAt: string
  externalId?: string
  name: string
  gender: 0 | 1
  birthYear: number
  address: string
  phoneNumber?: string
  SSN?: string
}
export type SearchPatientResponseDto = {
  total: number
  offset: number
  limit: number
  items: PatientResponseDto[]
}
export type SearchPatientRequestDto = {
  offset?: number
  limit?: number
  sort?: object
  filter?: object
}
export type CreatePatientRequestDto = {
  externalId?: string
  name: string
  gender: 0 | 1
  birthYear: number
  address: string
  phoneNumber?: string
  SSN?: string
}
export type UpdatePatientRequestDto = {
  externalId?: string
  name?: string
  gender?: 0 | 1
  birthYear?: number
  address?: string
  phoneNumber?: string
  SSN?: string
}
export const {
  useLazyPatientSearchQuery,
  usePatientSearchQuery,
  usePatientCreateMutation,
  usePatientUpdateByIdMutation,
  usePatientUpsertByIdMutation,
  usePatientFindByIdQuery,
  useLazyPatientFindByIdQuery,
  usePatientDeleteByIdMutation,
} = injectedRtkApi
