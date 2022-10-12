import { AppPermission, Role } from '@diut/common'
import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { enhancedApi as authApi } from 'src/api/auth'
import { RootState } from 'src/core'

interface AuthState {
  name?: string
  accessToken?: string
  roles?: Role[]
  permissions?: AppPermission[]
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
        state.name = payload?.name
        state.accessToken = payload?.generatedAccessToken
        state.roles = payload?.roles as Role[]
        state.permissions = payload?.permissions as AppPermission[]
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

export const selectUserName = (state: RootState) => state.auth.name
export const selectAccessToken = (state: RootState) => state.auth.accessToken
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.accessToken !== undefined
export const selectUserPermissions = (state: RootState) =>
  state.auth.permissions ?? []
