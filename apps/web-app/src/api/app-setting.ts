import { AppSetting } from '@diut/common'
import { apiSlice as api } from './slice'
export const addTagTypes = ['app-settings'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      appSettingGet: build.mutation<
        AppSettingGetApiResponse,
        AppSettingGetApiArg
      >({
        query: (queryArg) => ({
          url: `/api/app-settings/get`,
          method: 'POST',
          body: queryArg.getAppSettingRequestDto,
          responseHandler: 'text',
        }),
      }),
      appSettingSet: build.mutation<
        AppSettingSetApiResponse,
        AppSettingSetApiArg
      >({
        query: (queryArg) => ({
          url: `/api/app-settings/set`,
          method: 'POST',
          body: queryArg.setAppSettingRequestDto,
          responseHandler: 'text',
        }),
      }),
      appSettingDelete: build.mutation<
        AppSettingDeleteApiResponse,
        AppSettingDeleteApiArg
      >({
        query: (queryArg) => ({
          url: `/api/app-settings`,
          method: 'DELETE',
          body: queryArg.getAppSettingRequestDto,
          responseHandler: 'text',
        }),
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as appSettingApi }
export type AppSettingGetApiResponse = string
export type AppSettingGetApiArg = {
  getAppSettingRequestDto: GetAppSettingRequestDto
}
export type AppSettingSetApiResponse = string
export type AppSettingSetApiArg = {
  setAppSettingRequestDto: SetAppSettingRequestDto
}
export type AppSettingDeleteApiResponse = string
export type AppSettingDeleteApiArg = {
  getAppSettingRequestDto: GetAppSettingRequestDto
}
export type GetAppSettingRequestDto = {
  setting: AppSetting
}
export type SetAppSettingRequestDto = {
  setting: AppSetting
  value: any
}
export const {
  useAppSettingGetMutation,
  useAppSettingSetMutation,
  useAppSettingDeleteMutation,
} = injectedRtkApi
