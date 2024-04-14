import { accessServiceApiSlice as api } from './slice'
export const addTagTypes = ['v1-bio-products'] as const
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
          url: `/api/v1/bio-products/search`,
          method: 'POST',
          body: queryArg,
        }),
        providesTags: ['v1-bio-products'],
      }),
      bioProductCreate: build.mutation<
        BioProductCreateApiResponse,
        BioProductCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/bio-products`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['v1-bio-products'],
      }),
      bioProductFindById: build.query<
        BioProductFindByIdApiResponse,
        BioProductFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/v1/bio-products/${queryArg}` }),
        providesTags: ['v1-bio-products'],
      }),
      bioProductUpdateById: build.mutation<
        BioProductUpdateByIdApiResponse,
        BioProductUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/bio-products/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.bioProductUpdateRequestDto,
        }),
        invalidatesTags: ['v1-bio-products'],
      }),
      bioProductDeleteById: build.mutation<
        BioProductDeleteByIdApiResponse,
        BioProductDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/bio-products/${queryArg}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['v1-bio-products'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as bioProductApi }
export type BioProductSearchApiResponse =
  /** status 200  */ BioProductSearchResponseDto
export type BioProductSearchApiArg = BioProductSearchRequestDto
export type BioProductCreateApiResponse =
  /** status 201  */ BioProductUnpopulatedResponseDto
export type BioProductCreateApiArg = BioProductCreateRequestDto
export type BioProductFindByIdApiResponse =
  /** status 200  */ BioProductResponseDto
export type BioProductFindByIdApiArg = string
export type BioProductUpdateByIdApiResponse =
  /** status 200  */ BioProductUnpopulatedResponseDto
export type BioProductUpdateByIdApiArg = {
  id: string
  bioProductUpdateRequestDto: BioProductUpdateRequestDto
}
export type BioProductDeleteByIdApiResponse =
  /** status 200  */ BioProductUnpopulatedResponseDto
export type BioProductDeleteByIdApiArg = string
export type TestUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  shouldDisplayWithChildren: boolean
  bioProductId: string | null
  instrumentId: string | null
  sampleTypeId: string | null
  testCategoryId: string
  printFormId: string | null
  branchId: string
}
export type BranchUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  address: string
  type: 'Internal' | 'External'
  sampleOriginIds: string[]
}
export type BioProductResponseDto = {
  _id: string
  displayIndex: number
  name: string
  testId: string
  branchId: string
  test?: TestUnpopulatedResponseDto | null
  branch?: BranchUnpopulatedResponseDto | null
}
export type BioProductSearchResponseDto = {
  total: number
  offset: number
  limit: number
  items: BioProductResponseDto[]
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
export type BioProductSearchRequestDto = {
  offset?: number
  limit?: number
  sort?: object
  filter?: object
  populates?: PopulateOptionDto[]
}
export type BioProductUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  testId: string
  branchId: string
}
export type BioProductCreateRequestDto = {
  displayIndex: number
  name: string
  testId: string
  branchId: string
}
export type BioProductUpdateRequestDto = {
  displayIndex?: number
  name?: string
  testId?: string
  branchId?: string
}
export const {
  useBioProductSearchQuery,
  useLazyBioProductSearchQuery,
  useBioProductCreateMutation,
  useBioProductFindByIdQuery,
  useLazyBioProductFindByIdQuery,
  useBioProductUpdateByIdMutation,
  useBioProductDeleteByIdMutation,
} = injectedRtkApi
