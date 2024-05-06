import { accessServiceApiSlice as api } from './slice'
export const addTagTypes = ['v1-print-forms'] as const
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
          url: `/api/v1/print-forms/search`,
          method: 'POST',
          body: queryArg,
        }),
        providesTags: ['v1-print-forms'],
      }),
      printFormCreate: build.mutation<
        PrintFormCreateApiResponse,
        PrintFormCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/print-forms`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['v1-print-forms'],
      }),
      printFormFindById: build.query<
        PrintFormFindByIdApiResponse,
        PrintFormFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/v1/print-forms/${queryArg}` }),
        providesTags: ['v1-print-forms'],
      }),
      printFormUpdateById: build.mutation<
        PrintFormUpdateByIdApiResponse,
        PrintFormUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/print-forms/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.printFormUpdateRequestDto,
        }),
        invalidatesTags: ['v1-print-forms'],
      }),
      printFormDeleteById: build.mutation<
        PrintFormDeleteByIdApiResponse,
        PrintFormDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/print-forms/${queryArg}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['v1-print-forms'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as printFormApi }
export type PrintFormSearchApiResponse =
  /** status 200  */ PrintFormSearchResponseDto
export type PrintFormSearchApiArg = PrintFormSearchRequestDto
export type PrintFormCreateApiResponse =
  /** status 201  */ PrintFormUnpopulatedResponseDto
export type PrintFormCreateApiArg = PrintFormCreateRequestDto
export type PrintFormFindByIdApiResponse =
  /** status 200  */ PrintFormResponseDto
export type PrintFormFindByIdApiArg = string
export type PrintFormUpdateByIdApiResponse =
  /** status 200  */ PrintFormUnpopulatedResponseDto
export type PrintFormUpdateByIdApiArg = {
  id: string
  printFormUpdateRequestDto: PrintFormUpdateRequestDto
}
export type PrintFormDeleteByIdApiResponse =
  /** status 200  */ PrintFormUnpopulatedResponseDto
export type PrintFormDeleteByIdApiArg = string
export type BranchUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  address: string
  type: 'Internal' | 'External'
  sampleOriginIds: string[]
}
export type PrintFormResponseDto = {
  _id: string
  displayIndex: number
  name: string
  isA4: boolean
  isAuthorLocked: boolean
  authorTitle: string
  authorName: string
  titleMargin: number
  template: 'FormChung' | 'FormHIV' | 'FormPap' | 'FormSoiNhuom' | 'FormTD'
  branchId: string
  branch?: BranchUnpopulatedResponseDto | null
}
export type PrintFormSearchResponseDto = {
  total: number
  offset: number
  limit: number
  items: PrintFormResponseDto[]
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
    | 'ENTITY_TEST_INVALID_BIO_PRODUCT'
    | 'EXTERNAL_SERVICE'
    | 'BROWSER_SERVICE'
    | 'BROWSER_SERVICE_EXCEPTION'
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
export type PrintFormSearchRequestDto = {
  offset?: number
  limit?: number
  projection?: unknown
  sort?: object
  filter?: object
  populates?: PopulateOptionDto[]
}
export type PrintFormUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  isA4: boolean
  isAuthorLocked: boolean
  authorTitle: string
  authorName: string
  titleMargin: number
  template: 'FormChung' | 'FormHIV' | 'FormPap' | 'FormSoiNhuom' | 'FormTD'
  branchId: string
}
export type PrintFormCreateRequestDto = {
  displayIndex: number
  name: string
  isA4: boolean
  isAuthorLocked: boolean
  authorTitle: string
  authorName: string
  titleMargin: number
  template: 'FormChung' | 'FormHIV' | 'FormPap' | 'FormSoiNhuom' | 'FormTD'
  branchId: string
}
export type PrintFormUpdateRequestDto = {
  displayIndex?: number
  name?: string
  isA4?: boolean
  isAuthorLocked?: boolean
  authorTitle?: string
  authorName?: string
  titleMargin?: number
  template?: 'FormChung' | 'FormHIV' | 'FormPap' | 'FormSoiNhuom' | 'FormTD'
  branchId?: string
}
export const {
  usePrintFormSearchQuery,
  useLazyPrintFormSearchQuery,
  usePrintFormCreateMutation,
  usePrintFormFindByIdQuery,
  useLazyPrintFormFindByIdQuery,
  usePrintFormUpdateByIdMutation,
  usePrintFormDeleteByIdMutation,
} = injectedRtkApi
