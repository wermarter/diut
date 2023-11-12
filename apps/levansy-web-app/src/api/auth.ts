import { Permission, LoginExceptionMsg } from '@diut/levansy-common'
import { apiSlice as api } from './slice'
export const addTagTypes = ['auth'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      authLogin: build.mutation<AuthLoginApiResponse, AuthLoginApiArg>({
        query: (queryArg) => ({
          url: `/api/auth/login`,
          method: 'POST',
          body: queryArg.loginRequestDto,
        }),
        invalidatesTags: ['auth'],
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as authApi }
export type AuthLoginApiResponse = /** status 200  */ LoginResponseDto
export type AuthLoginApiArg = {
  loginRequestDto: LoginRequestDto
}
export type LoginResponseDto = {
  _id: string
  createdAt: string
  updatedAt: string
  username: string
  name: string
  phoneNumber?: string
  permissions: Permission[]
  generatedAccessToken: string
}
export type LoginBadRequestDto = {
  statusCode: number
  error: string
  message: LoginExceptionMsg
}
export type LoginRequestDto = {
  username: string
  password: string
}
export const { useAuthLoginMutation } = injectedRtkApi
