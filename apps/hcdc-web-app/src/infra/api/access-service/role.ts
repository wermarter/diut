import { accessServiceApiSlice as api } from './slice'
export const addTagTypes = ['v1-roles'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      roleSearch: build.query<RoleSearchApiResponse, RoleSearchApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/roles/search`,
          method: 'POST',
          body: queryArg,
        }),
        providesTags: ['v1-roles'],
      }),
      roleCreate: build.mutation<RoleCreateApiResponse, RoleCreateApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/roles`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['v1-roles'],
      }),
      roleFindById: build.query<RoleFindByIdApiResponse, RoleFindByIdApiArg>({
        query: (queryArg) => ({ url: `/api/v1/roles/${queryArg}` }),
        providesTags: ['v1-roles'],
      }),
      roleUpdateById: build.mutation<
        RoleUpdateByIdApiResponse,
        RoleUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/roles/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.roleUpdateRequestDto,
        }),
        invalidatesTags: ['v1-roles'],
      }),
      roleDeleteById: build.mutation<
        RoleDeleteByIdApiResponse,
        RoleDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/roles/${queryArg}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['v1-roles'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as roleApi }
export type RoleSearchApiResponse = /** status 200  */ RoleSearchResponseDto
export type RoleSearchApiArg = RoleSearchRequestDto
export type RoleCreateApiResponse =
  /** status 201  */ RoleUnpopulatedResponseDto
export type RoleCreateApiArg = RoleCreateRequestDto
export type RoleFindByIdApiResponse = /** status 200  */ RoleResponseDto
export type RoleFindByIdApiArg = string
export type RoleUpdateByIdApiResponse =
  /** status 200  */ RoleUnpopulatedResponseDto
export type RoleUpdateByIdApiArg = {
  id: string
  roleUpdateRequestDto: RoleUpdateRequestDto
}
export type RoleDeleteByIdApiResponse =
  /** status 200  */ RoleUnpopulatedResponseDto
export type RoleDeleteByIdApiArg = string
export type PermissionRuleRequestDto = {
  subject:
    | 'BioProduct'
    | 'TestCategory'
    | 'Branch'
    | 'Role'
    | 'User'
    | 'Instrument'
    | 'SampleType'
    | 'Doctor'
    | 'PatientType'
    | 'Diagnosis'
    | 'PrintForm'
    | 'Test'
    | 'TestResult'
    | 'TestElement'
    | 'Patient'
    | 'TestCombo'
    | 'Sample'
    | 'all'
  action:
    | 'Create'
    | 'Read'
    | 'Update'
    | 'Delete'
    | 'AssignToUser'
    | 'AssignUserInline'
    | 'ChangePassword'
    | 'OverrideAuthor'
    | 'Modify'
    | 'UpdateInfo'
    | 'UpdateResult'
    | 'PrintResult'
    | 'ExportReport'
    | 'View'
    | 'manage'
  inverted?: boolean
  conditions: object
}
export type BranchUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  address: string
  type: 'Internal' | 'External'
  sampleOriginIds: string[]
}
export type RoleResponseDto = {
  _id: string
  displayIndex: number
  name: string
  description: string
  permissions: PermissionRuleRequestDto[]
  branchId: string
  branch?: BranchUnpopulatedResponseDto | null
}
export type RoleSearchResponseDto = {
  total: number
  offset: number
  limit: number
  items: RoleResponseDto[]
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
export type RoleSearchRequestDto = {
  offset?: number
  limit?: number
  projection?: unknown
  sort?: object
  filter?: object
  populates?: PopulateOptionDto[]
}
export type RoleUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  description: string
  permissions: PermissionRuleRequestDto[]
  branchId: string
}
export type RoleCreateRequestDto = {
  displayIndex: number
  name: string
  description: string
  permissions: PermissionRuleRequestDto[]
  branchId: string
}
export type RoleUpdateRequestDto = {
  displayIndex?: number
  name?: string
  description?: string
  permissions?: PermissionRuleRequestDto[]
  branchId?: string
}
export const {
  useRoleSearchQuery,
  useLazyRoleSearchQuery,
  useRoleCreateMutation,
  useRoleFindByIdQuery,
  useLazyRoleFindByIdQuery,
  useRoleUpdateByIdMutation,
  useRoleDeleteByIdMutation,
} = injectedRtkApi
