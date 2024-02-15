import {
  createAction,
  createSlice,
  isRejectedWithValue,
  Middleware,
} from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { toast } from 'react-toastify'

import { authApi } from 'src/infra/api/access-service/auth'
import { RootState } from 'src/infra/redux'

interface AuthState {
  id?: string
  name?: string
  accessToken?: string
  permissions?: Permission[]
}

// Reset store state on user logout or token expiration
export const USER_LOGOUT = 'userLogout'
export const userLogout = createAction(USER_LOGOUT, () => {
  return { payload: null }
})

export const authMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      const { status, data } = action?.payload ?? {}

      if (status === 401) {
        dispatch(userLogout())
      }

      if (status === 403) {
        toast.error('Bạn không có quyền truy cập tài nguyên này.')
      }

      if (status === 400) {
        const { message } = data ?? {}

        if (message?.[0]?.length > 1) {
          // class-validator exception
          message.forEach((msg: any) => {
            toast.error(msg)
          })
        } else {
          // custom bad request message
          toast.error(message)
        }
      }

      if (status === 500) {
        toast.error('Lỗi hệ thống')
      }
    }

    return next(action)
  }

const initialState: AuthState = {}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.authLogin.matchFulfilled,
      (state, { payload }) => {
        state.id = payload?._id
        state.name = payload?.name
        state.accessToken = payload?.generatedAccessToken
        state.permissions = payload?.permissions
      },
    )
  },
})

export const authReducer = persistReducer(
  {
    key: 'rtk:' + authSlice.name,
    storage,
  },
  authSlice.reducer,
)

export const selectUserId = (state: RootState) => state.auth.id
export const selectUserName = (state: RootState) => state.auth.name
export const selectAccessToken = (state: RootState) => state.auth.accessToken
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.accessToken != undefined
export const selectUserPermissions = (state: RootState) =>
  state.auth.permissions ?? []
export const selectUserIsAdmin = (state: RootState) =>
  isAdmin(state.auth.permissions)
