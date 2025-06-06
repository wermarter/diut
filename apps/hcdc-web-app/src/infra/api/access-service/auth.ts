import { accessServiceApiSlice as api } from './slice'
export const addTagTypes = ['auth'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      authLogin: build.mutation<AuthLoginApiResponse, AuthLoginApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/auth/login`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['auth'],
      }),
      authMe: build.query<AuthMeApiResponse, AuthMeApiArg>({
        query: () => ({ url: `/api/v1/auth/me` }),
        providesTags: ['auth'],
      }),
      authLogout: build.mutation<AuthLogoutApiResponse, AuthLogoutApiArg>({
        query: () => ({ url: `/api/v1/auth/logout`, method: 'POST' }),
        invalidatesTags: ['auth'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as authApi }
export type AuthLoginApiResponse = /** status 200  */ LoginResponseDto
export type AuthLoginApiArg = AuthLoginRequestDto
export type AuthMeApiResponse = /** status 200  */ AuthMeResponseDto
export type AuthMeApiArg = void
export type AuthLogoutApiResponse = unknown
export type AuthLogoutApiArg = void
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
    | 'SampleTestResult'
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
  reportConfig: object
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
export type LoginResponseDto = {
  user: UserResponseDto
  permissions: PermissionRuleRequestDto[]
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
export type AuthLoginRequestDto = {
  username: string
  password: string
}
export type AuthMeResponseDto = {
  user: UserResponseDto
}
export const {
  useAuthLoginMutation,
  useAuthMeQuery,
  useLazyAuthMeQuery,
  useAuthLogoutMutation,
} = injectedRtkApi
