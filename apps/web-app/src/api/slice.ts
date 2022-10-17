import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

import { appConfig } from 'src/core/config'
import { selectAccessToken, userLogout } from 'src/modules/auth'

const authorizedBaseQuery = fetchBaseQuery({
  baseUrl: appConfig.apiBaseUrl,

  prepareHeaders: (headers, { getState }) => {
    const token = selectAccessToken(getState() as any)
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

// https://redux-toolkit.js.org/rtk-query/usage/customizing-queries
const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await authorizedBaseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // // login again
    // await api.dispatch(adminLogin())
    // // retry the initial query
    // result = await authorizedBaseQuery(args, api, extraOptions)
    api.dispatch(userLogout())
  }
  return result
}

// Define our single API slice object
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  // refetchOnReconnect: true,
  keepUnusedDataFor: 60 * 60 * 24,
  endpoints: () => ({}),
})
