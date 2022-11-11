import { PrintForm } from '@diut/common'
import { apiSlice as api } from './slice'
export const addTagTypes = ['samples'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      sampleSearch: build.query<SampleSearchApiResponse, SampleSearchApiArg>({
        query: (queryArg) => ({
          url: `/api/samples/search`,
          method: 'POST',
          body: queryArg.searchSampleRequestDto,
        }),
        providesTags: ['samples'],
      }),
      sampleCreate: build.mutation<SampleCreateApiResponse, SampleCreateApiArg>(
        {
          query: (queryArg) => ({
            url: `/api/samples`,
            method: 'POST',
            body: queryArg.createSampleRequestDto,
          }),
          invalidatesTags: ['samples'],
        }
      ),
      sampleUpdateById: build.mutation<
        SampleUpdateByIdApiResponse,
        SampleUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/samples/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.updateSampleRequestDto,
        }),
        invalidatesTags: ['samples'],
      }),
      sampleFindById: build.query<
        SampleFindByIdApiResponse,
        SampleFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/samples/${queryArg.id}` }),
        providesTags: ['samples'],
      }),
      sampleDeleteById: build.mutation<
        SampleDeleteByIdApiResponse,
        SampleDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/samples/${queryArg.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['samples'],
      }),
      samplePrint: build.mutation<SamplePrintApiResponse, SamplePrintApiArg>({
        query: (queryArg) => ({
          url: `/api/samples/print`,
          method: 'POST',
          body: queryArg.printSampleRequestDto,
          cache: 'no-cache',
          responseHandler: async (response: any) => {
            const objectURL = (window.URL ?? window.webkitURL).createObjectURL(
              await response.blob()
            )
            const hiddenElement = document.createElement('a')
            hiddenElement.href = objectURL
            hiddenElement.target = '_blank'
            hiddenElement.click()

            return objectURL
          },
        }),
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as sampleApi }
export type SampleSearchApiResponse = /** status 200  */ SearchSampleResponseDto
export type SampleSearchApiArg = {
  searchSampleRequestDto: SearchSampleRequestDto
}
export type SampleCreateApiResponse = /** status 201  */ SampleResponseDto
export type SampleCreateApiArg = {
  createSampleRequestDto: CreateSampleRequestDto
}
export type SampleUpdateByIdApiResponse = /** status 200  */ SampleResponseDto
export type SampleUpdateByIdApiArg = {
  id: string
  updateSampleRequestDto: UpdateSampleRequestDto
}
export type SampleFindByIdApiResponse = /** status 200  */ SampleResponseDto
export type SampleFindByIdApiArg = {
  id: string
}
export type SampleDeleteByIdApiResponse = /** status 200  */ SampleResponseDto
export type SampleDeleteByIdApiArg = {
  id: string
}
export type SamplePrintApiResponse = unknown
export type SamplePrintApiArg = {
  printSampleRequestDto: PrintSampleRequestDto
}
export type TestElementResultDto = {
  id: string
  value: string
  isHighlighted: boolean
}
export type TestResultDto = {
  testId: string
  bioProductName?: string
  resultBy?: string
  testCompleted: boolean
  elements: TestElementResultDto[]
}
export type SampleResponseDto = {
  _id: string
  createdAt: string
  updatedAt: string
  sampleId: string
  sampledAt: string
  infoAt: string
  infoBy: string
  patientId: string
  doctorId: string
  patientTypeId: string
  indicationId: string
  sampleTypeIds: string[]
  results: TestResultDto[]
  resultBy: string[]
  infoCompleted: boolean
  sampleCompleted: boolean
}
export type SearchSampleResponseDto = {
  total: number
  offset: number
  limit: number
  items: SampleResponseDto[]
}
export type SearchSampleRequestDto = {
  offset?: number
  limit?: number
  sort?: object
  filter?: object
}
export type SampleTestDto = {
  id: string
  bioProductName?: string | null
}
export type CreateSampleRequestDto = {
  sampleId: string
  sampledAt: string
  infoAt: string
  patientId: string
  doctorId: string
  patientTypeId: string
  indicationId: string
  sampleTypeIds: string[]
  tests: SampleTestDto[]
}
export type UpdateSampleRequestDto = {
  sampleId?: string
  sampledAt?: string
  infoAt?: string
  patientId?: string
  doctorId?: string
  patientTypeId?: string
  indicationId?: string
  sampleTypeIds?: string[]
  tests?: SampleTestDto[]
  results?: TestResultDto[]
  infoCompleted?: boolean
  sampleCompleted?: boolean
}
export type SinglePrintRequestDto = {
  sampleId: string
  printForm?: PrintForm
  authorPosition?: string
  authorName?: string
  sampleTypes?: string[]
}
export type PrintSampleRequestDto = {
  samples: SinglePrintRequestDto[]
}
export const {
  useSampleSearchQuery,
  useLazySampleSearchQuery,
  useSampleCreateMutation,
  useSampleUpdateByIdMutation,
  useSampleFindByIdQuery,
  useLazySampleFindByIdQuery,
  useSampleDeleteByIdMutation,
  useSamplePrintMutation,
} = injectedRtkApi
