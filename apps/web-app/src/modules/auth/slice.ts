import { Permission, Role } from '@diut/common'
import {
  createAction,
  createSlice,
  isRejectedWithValue,
  Middleware,
} from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { authApi } from 'src/api/auth'
import { RootState } from 'src/core'

interface AuthState {
  id?: string
  name?: string
  accessToken?: string
  roles?: Role[]
  permissions?: Permission[]
}

// Reset store state on user logout or token expiration
export const USER_LOGOUT = 'userLogout'
export const userLogout = createAction(USER_LOGOUT, () => {
  return { payload: null }
})

export const unauthenticatedMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action) && action?.payload?.status === 401) {
      dispatch(userLogout())
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
        state.roles = payload?.roles
        state.permissions = payload?.permissions
      }
    )
  },
})

export const authReducer = persistReducer(
  {
    key: 'rtk:' + authSlice.name,
    storage,
  },
  authSlice.reducer
)

export const selectUserId = (state: RootState) => state.auth.id
export const selectUserName = (state: RootState) => state.auth.name
export const selectAccessToken = (state: RootState) => state.auth.accessToken
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.accessToken !== undefined
export const selectUserPermissions = (state: RootState) =>
  state.auth.permissions ?? []
export const selectUserRoles = (state: RootState) => state.auth.roles ?? []
