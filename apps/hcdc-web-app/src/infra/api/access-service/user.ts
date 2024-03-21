import { accessServiceApiSlice as api } from './slice'
export const addTagTypes = ['v1-users'] as const
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
        providesTags: ['v1-users'],
      }),
      userCreate: build.mutation<UserCreateApiResponse, UserCreateApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/users`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['v1-users'],
      }),
      userFindById: build.query<UserFindByIdApiResponse, UserFindByIdApiArg>({
        query: (queryArg) => ({ url: `/api/v1/users/${queryArg}` }),
        providesTags: ['v1-users'],
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
        invalidatesTags: ['v1-users'],
      }),
      userDeleteById: build.mutation<
        UserDeleteByIdApiResponse,
        UserDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/users/${queryArg}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['v1-users'],
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
        invalidatesTags: ['v1-users'],
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
    | 'WebApp'
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
export type UserSearchRequestDto = {
  offset?: number
  limit?: number
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
} = injectedRtkApi
