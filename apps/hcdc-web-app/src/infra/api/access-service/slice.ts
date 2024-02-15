import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

import { appConfig } from 'src/config'
import { userLogout } from 'src/infra/auth'

const authorizedBaseQuery = fetchBaseQuery({
  baseUrl: appConfig.apiBaseUrl,
  credentials: 'include',
  keepalive: true,
})

// https://redux-toolkit.js.org/rtk-query/usage/customizing-queries
const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await authorizedBaseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    api.dispatch(userLogout())
  }

  return result
}

export const accessServiceApiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  refetchOnReconnect: true,
  keepUnusedDataFor: 60 * 60 * 10, // 10 hours
  endpoints: () => ({}),
})
