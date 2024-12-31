import { accessServiceApiSlice as api } from './slice'
export const addTagTypes = ['branches'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      branchSearch: build.query<BranchSearchApiResponse, BranchSearchApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/branches/search`,
          method: 'POST',
          body: queryArg,
        }),
        providesTags: ['branches'],
      }),
      branchCreate: build.mutation<BranchCreateApiResponse, BranchCreateApiArg>(
        {
          query: (queryArg) => ({
            url: `/api/v1/branches`,
            method: 'POST',
            body: queryArg,
          }),
          invalidatesTags: ['branches'],
        },
      ),
      branchFindById: build.query<
        BranchFindByIdApiResponse,
        BranchFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/v1/branches/${queryArg}` }),
        providesTags: ['branches'],
      }),
      branchUpdateById: build.mutation<
        BranchUpdateByIdApiResponse,
        BranchUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/branches/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.branchUpdateRequestDto,
        }),
        invalidatesTags: ['branches'],
      }),
      branchDeleteById: build.mutation<
        BranchDeleteByIdApiResponse,
        BranchDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/branches/${queryArg}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['branches'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as branchApi }
export type BranchSearchApiResponse = /** status 200  */ BranchSearchResponseDto
export type BranchSearchApiArg = BranchSearchRequestDto
export type BranchCreateApiResponse =
  /** status 201  */ BranchUnpopulatedResponseDto
export type BranchCreateApiArg = BranchCreateRequestDto
export type BranchFindByIdApiResponse = /** status 200  */ BranchResponseDto
export type BranchFindByIdApiArg = string
export type BranchUpdateByIdApiResponse =
  /** status 200  */ BranchUnpopulatedResponseDto
export type BranchUpdateByIdApiArg = {
  id: string
  branchUpdateRequestDto: BranchUpdateRequestDto
}
export type BranchDeleteByIdApiResponse =
  /** status 200  */ BranchUnpopulatedResponseDto
export type BranchDeleteByIdApiArg = string
export type BranchUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  address: string
  type: 'Internal' | 'External'
  reportConfig: object
  sampleOriginIds: string[]
}
export type BranchResponseDto = {
  _id: string
  displayIndex: number
  name: string
  address: string
  type: 'Internal' | 'External'
  reportConfig: object
  sampleOriginIds: string[]
  sampleOrigins?: BranchUnpopulatedResponseDto[]
}
export type BranchSearchResponseDto = {
  total: number
  offset: number
  limit: number
  items: BranchResponseDto[]
}
export type HttpErrorResponse = {
  errorCode:
    | 'UNKNOWN'
    | 'AUTHN'
    | 'AUTHN_JWT_INVALID_TOKEN'
    | 'AUTHN_LOGIN_INVALID_USERNAME'
    | 'AUTHN_LOGIN_INVALID_PASSWORD'
    | 'AUTHN_COOKIE_NOT_FOUND'
    | 'AUTHN_PAYLOAD_INVALID'
    | 'AUTHZ'
    | 'AUTHZ_AUTHENTICATION_REQUIRED'
    | 'AUTHZ_PERMISSION_DENIED'
    | 'AUTHZ_CONTEXT_INVALID'
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
export type BranchSearchRequestDto = {
  offset?: number
  limit?: number
  /** mongoose Query.sort() */
  sort?: object
  projection?: object
  /** mongoose FilterQuery */
  filter?: object
  populates?: PopulateOptionDto[]
}
export type BranchCreateRequestDto = {
  displayIndex: number
  name: string
  address: string
  type: 'Internal' | 'External'
  reportConfig: object
  sampleOriginIds: string[]
}
export type BranchUpdateRequestDto = {
  displayIndex?: number
  name?: string
  address?: string
  type?: 'Internal' | 'External'
  reportConfig?: object
  sampleOriginIds?: string[]
}
export const {
  useBranchSearchQuery,
  useLazyBranchSearchQuery,
  useBranchCreateMutation,
  useBranchFindByIdQuery,
  useLazyBranchFindByIdQuery,
  useBranchUpdateByIdMutation,
  useBranchDeleteByIdMutation,
} = injectedRtkApi
