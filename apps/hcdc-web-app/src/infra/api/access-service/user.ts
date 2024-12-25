import { accessServiceApiSlice as api } from './slice'
export const addTagTypes = ['users'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      userSearch: build.query<UserSearchApiResponse, UserSearchApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/users/search`,
          method: 'POST',
          body: queryArg,
        }),
        providesTags: ['users'],
      }),
      userCreate: build.mutation<UserCreateApiResponse, UserCreateApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/users`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['users'],
      }),
      userFindById: build.query<UserFindByIdApiResponse, UserFindByIdApiArg>({
        query: (queryArg) => ({ url: `/api/v1/users/${queryArg}` }),
        providesTags: ['users'],
      }),
      userUpdateById: build.mutation<
        UserUpdateByIdApiResponse,
        UserUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/users/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.userUpdateRequestDto,
        }),
        invalidatesTags: ['users'],
      }),
      userDeleteById: build.mutation<
        UserDeleteByIdApiResponse,
        UserDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/users/${queryArg}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['users'],
      }),
      userChangePassword: build.mutation<
        UserChangePasswordApiResponse,
        UserChangePasswordApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/users/${queryArg.id}/change-password`,
          method: 'POST',
          body: queryArg.userChangePasswordRequestDto,
        }),
        invalidatesTags: ['users'],
      }),
      userBranchAuthorize: build.mutation<
        UserBranchAuthorizeApiResponse,
        UserBranchAuthorizeApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/users/${queryArg.userId}/branch-authorize/${queryArg.branchId}`,
          method: 'POST',
        }),
        invalidatesTags: ['users'],
      }),
      userBranchDeauthorize: build.mutation<
        UserBranchDeauthorizeApiResponse,
        UserBranchDeauthorizeApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/users/${queryArg.userId}/branch-deauthorize/${queryArg.branchId}`,
          method: 'POST',
        }),
        invalidatesTags: ['users'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as userApi }
export type UserSearchApiResponse = /** status 200  */ UserSearchResponseDto
export type UserSearchApiArg = UserSearchRequestDto
export type UserCreateApiResponse = /** status 201  */ UserResponseDto
export type UserCreateApiArg = UserCreateRequestDto
export type UserFindByIdApiResponse = /** status 200  */ UserResponseDto
export type UserFindByIdApiArg = string
export type UserUpdateByIdApiResponse = /** status 200  */ UserResponseDto
export type UserUpdateByIdApiArg = {
  id: string
  userUpdateRequestDto: UserUpdateRequestDto
}
export type UserDeleteByIdApiResponse = /** status 200  */ UserResponseDto
export type UserDeleteByIdApiArg = string
export type UserChangePasswordApiResponse = /** status 200  */ UserResponseDto
export type UserChangePasswordApiArg = {
  id: string
  userChangePasswordRequestDto: UserChangePasswordRequestDto
}
export type UserBranchAuthorizeApiResponse = unknown
export type UserBranchAuthorizeApiArg = {
  userId: string
  branchId: string
}
export type UserBranchDeauthorizeApiResponse = unknown
export type UserBranchDeauthorizeApiArg = {
  userId: string
  branchId: string
}
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
    | 'Report'
    | 'all'
  action:
    | 'Create'
    | 'Read'
    | 'Update'
    | 'Delete'
    | 'AuthorizeUser'
    | 'DeauthorizeUser'
    | 'AssignToUser'
    | 'AssignUserInline'
    | 'ChangePassword'
    | 'OverrideAuthor'
    | 'Modify'
    | 'UpdateInfo'
    | 'UpdateResult'
    | 'PrintResult'
    | 'GeneratePrintUrl'
    | 'ExportReport'
    | 'View'
    | 'Export'
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
  reportConfig: object
  sampleOriginIds: string[]
}
export type RoleUnpopulatedResponseDto = {
  _id: string
  displayIndex: number
  name: string
  description: string
  permissions: PermissionRuleRequestDto[]
  branchId: string
}
export type UserResponseDto = {
  _id: string
  username: string
  name: string
  phoneNumber: string
  inlinePermissions: PermissionRuleRequestDto[]
  branchIds: string[]
  roleIds: string[]
  branches?: BranchUnpopulatedResponseDto[]
  roles?: RoleUnpopulatedResponseDto[]
}
export type UserSearchResponseDto = {
  total: number
  offset: number
  limit: number
  items: UserResponseDto[]
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
export type UserSearchRequestDto = {
  offset?: number
  limit?: number
  projection?: unknown
  sort?: object
  filter?: object
  populates?: PopulateOptionDto[]
}
export type UserCreateRequestDto = {
  username: string
  password: string
  name: string
  phoneNumber: string
  inlinePermissions: PermissionRuleRequestDto[]
  branchIds: string[]
  roleIds: string[]
}
export type UserUpdateRequestDto = {
  username?: string
  password?: string
  name?: string
  phoneNumber?: string
  inlinePermissions?: PermissionRuleRequestDto[]
  branchIds?: string[]
  roleIds?: string[]
}
export type UserChangePasswordRequestDto = {
  password: string
}
export const {
  useUserSearchQuery,
  useLazyUserSearchQuery,
  useUserCreateMutation,
  useUserFindByIdQuery,
  useLazyUserFindByIdQuery,
  useUserUpdateByIdMutation,
  useUserDeleteByIdMutation,
  useUserChangePasswordMutation,
  useUserBranchAuthorizeMutation,
  useUserBranchDeauthorizeMutation,
} = injectedRtkApi
