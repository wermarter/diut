import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { toast } from 'react-toastify'

import { appConfig } from 'src/config'
import { userLogout } from 'src/features/auth/state/actions'

const authorizedBaseQuery = fetchBaseQuery({
  baseUrl: appConfig.apiBaseUrl,
  credentials: 'include',
  keepalive: true,
})

// https://redux-toolkit.js.org/rtk-query/usage/customizing-queries
const baseQueryWithErrorHandling: BaseQueryFn = async (
  args,
  api,
  extraOptions,
) => {
  let result = await authorizedBaseQuery(args, api, extraOptions)

  if (result.error) {
    const { message } = result.error.data as any

    switch (result.error.status) {
      case 400:
        toast.error(`Thông tin không hợp lệ\n${message}`)
        break
      case 401:
        toast.error(`Phiên đăng nhập hết hạn\n${message}`)
        api.dispatch(userLogout())
        break
      case 403:
        toast.error(`Bạn không có quyền này\n${message}`)
        break
      case 500:
        toast.error(`Lỗi hệ thống\n${message}`)
        break
    }
  }

  return result
}

export const accessServiceApiSlice = createApi({
  baseQuery: baseQueryWithErrorHandling,
  refetchOnReconnect: true,
  keepUnusedDataFor: 60 * 60 * 10, // 10 hours
  endpoints: () => ({}),
})
