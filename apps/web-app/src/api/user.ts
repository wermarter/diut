import { Permission, Role } from '@diut/common'
import { apiSlice as api } from './slice'
export const addTagTypes = ['users'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      userSearch: build.mutation<UserSearchApiResponse, UserSearchApiArg>({
        query: (queryArg) => ({
          url: `/api/users/search`,
          method: 'POST',
          body: queryArg.searchUserRequestDto,
        }),
        invalidatesTags: ['users'],
      }),
      userCreate: build.mutation<UserCreateApiResponse, UserCreateApiArg>({
        query: (queryArg) => ({
          url: `/api/users`,
          method: 'POST',
          body: queryArg.createUserRequestDto,
        }),
        invalidatesTags: ['users'],
      }),
      userUpdateById: build.mutation<
        UserUpdateByIdApiResponse,
        UserUpdateByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/users/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.updateUserRequestDto,
        }),
        invalidatesTags: ['users'],
      }),
      userFindById: build.query<UserFindByIdApiResponse, UserFindByIdApiArg>({
        query: (queryArg) => ({ url: `/api/users/${queryArg.id}` }),
        providesTags: ['users'],
      }),
      userDeleteById: build.mutation<
        UserDeleteByIdApiResponse,
        UserDeleteByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/users/${queryArg.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['users'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as userApi }
export type UserSearchApiResponse = /** status 200  */ SearchUserResponseDto
export type UserSearchApiArg = {
  searchUserRequestDto: SearchUserRequestDto
}
export type UserCreateApiResponse = /** status 201  */ UserResponseDto
export type UserCreateApiArg = {
  createUserRequestDto: CreateUserRequestDto
}
export type UserUpdateByIdApiResponse = /** status 200  */ UserResponseDto
export type UserUpdateByIdApiArg = {
  id: string
  updateUserRequestDto: UpdateUserRequestDto
}
export type UserFindByIdApiResponse = /** status 200  */ UserResponseDto
export type UserFindByIdApiArg = {
  id: string
}
export type UserDeleteByIdApiResponse = /** status 200  */ UserResponseDto
export type UserDeleteByIdApiArg = {
  id: string
}
export type UserResponseDto = {
  _id: string
  createdAt: string
  updatedAt: string
  username: string
  name: string
  phoneNumber?: string
  roles: Role[]
  permissions: Permission[]
}
export type SearchUserResponseDto = {
  total: number
  offset: number
  limit: number
  items: UserResponseDto[]
}
export type SearchUserRequestDto = {
  offset?: number
  limit?: number
  sort?: object
  filter?: object
}
export type UserBadRequestDto = {
  statusCode: number
  error: string
  message: 'USERNAME_EXISTED'
}
export type CreateUserRequestDto = {
  username: string
  name: string
  password: string
  phoneNumber?: string
  roles: Role[]
  permissions: Permission[]
}
export type UpdateUserRequestDto = {
  username?: string
  name?: string
  password?: string
  phoneNumber?: string
  roles?: Role[]
  permissions?: Permission[]
}
export const {
  useUserSearchMutation,
  useUserCreateMutation,
  useUserUpdateByIdMutation,
  useUserFindByIdQuery,
  useLazyUserFindByIdQuery,
  useUserDeleteByIdMutation,
} = injectedRtkApi
