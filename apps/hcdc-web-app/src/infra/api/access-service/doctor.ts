import { accessServiceApiSlice as api } from './slice'
export const addTagTypes = ['v1-doctors'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      doctorSearch: build.query<DoctorSearchApiResponse, DoctorSearchApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/doctors/search`,
          method: 'POST',
          body: queryArg,
        }),
        providesTags: ['v1-doctors'],
      }),
      doctorCreate: build.mutation<DoctorCreateApiResponse, DoctorCreateApiArg>(
        {
          query: (queryArg) => ({
            url: `/api/v1/doctors`,
            method: 'POST',
            body: queryArg,
          }),
          invalidatesTags: ['v1-doctors'],
        },
      ),
      doctorFindById: build.query<
        DoctorFindByIdApiResponse,
        DoctorFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/v1/doctors/${queryArg}` }),
        providesTags: ['v1-doctors'],
      }),
      doctorUpdateById: build.mutation<
        DoctorUpdateByIdApiResponse,
        DoctorUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/doctors/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.doctorUpdateRequestDto,
        }),
        invalidatesTags: ['v1-doctors'],
      }),
      doctorDeleteById: build.mutation<
        DoctorDeleteByIdApiResponse,
        DoctorDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/doctors/${queryArg}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['v1-doctors'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as doctorApi }
export type DoctorSearchApiResponse = /** status 200  */ DoctorSearchResponseDto
export type DoctorSearchApiArg = DoctorSearchRequestDto
export type DoctorCreateApiResponse =
  /** status 201  */ DoctorUnpopulatedResponseDto
export type DoctorCreateApiArg = DoctorCreateRequestDto
export type DoctorFindByIdApiResponse = /** status 200  */ DoctorResponseDto
export type DoctorFindByIdApiArg = string
export type DoctorUpdateByIdApiResponse =
  /** status 200  */ DoctorUnpopulatedResponseDto
export type DoctorUpdateByIdApiArg = {
  id: string
  doctorUpdateRequestDto: DoctorUpdateRequestDto
}
export type DoctorDeleteByIdApiResponse =
  /** status 200  */ DoctorUnpopulatedResponseDto
export type DoctorDeleteByIdApiArg = string
export type BranchUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  address: string
  type: 'Internal' | 'External'
  sampleOriginIds: string[]
}
export type DoctorResponseDto = {
  _id: string
  displayIndex: number
  name: string
  branchId: string
  branch?: BranchUnpopulatedResponseDto | null
}
export type DoctorSearchResponseDto = {
  total: number
  offset: number
  limit: number
  items: DoctorResponseDto[]
}
export type HttpErrorResponse = {
  errorCode:
    | 'UNKNOWN'
    | 'AUTHN'
    | 'AUTHN_JWT_INVALID_TOKEN'
    | 'AUTHN_LOGIN_INVALID_USERNAME'
    | 'AUTHN_LOGIN_INVALID_PASSWORD'
    | 'AUTHN_COOKIE_ACCESS_TOKEN_NOT_FOUND'
    | 'AUTHN_PAYLOAD_NOT_FOUND'
    | 'AUTHN_PAYLOAD_USER_NOT_FOUND'
    | 'AUTHZ'
    | 'AUTHZ_AUTHENTICATION_REQUIRED'
    | 'AUTHZ_PERMISSION_DENIED'
    | 'ENTITY'
    | 'ENTITY_NOT_FOUND'
    | 'ENTITY_CANNOT_DELETE'
    | 'ENTITY_POPULATE_PATH_UNKNOWN'
    | 'ENTITY_SAMPLE_ID_ALREADY_EXISTS'
    | 'SERVICE'
    | 'REQUEST'
    | 'REQUEST_INVALID_INPUT'
  message: string
}
export type PopulateOptionDto = {
  path: string
  isDeleted?: boolean | null
  fields?: string[]
  match?: object
}
export type DoctorSearchRequestDto = {
  offset?: number
  limit?: number
  sort?: object
  filter?: object
  populates?: PopulateOptionDto[]
}
export type DoctorUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  branchId: string
}
export type DoctorCreateRequestDto = {
  displayIndex: number
  name: string
  branchId: string
}
export type DoctorUpdateRequestDto = {
  displayIndex?: number
  name?: string
  branchId?: string
}
export const {
  useDoctorSearchQuery,
  useLazyDoctorSearchQuery,
  useDoctorCreateMutation,
  useDoctorFindByIdQuery,
  useLazyDoctorFindByIdQuery,
  useDoctorUpdateByIdMutation,
  useDoctorDeleteByIdMutation,
} = injectedRtkApi
