import { createAbility } from '@diut/hcdc'
import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { authApi } from 'src/infra/api/access-service/auth'
import {
  AuthState,
  AuthStateAuthenticated,
  AuthStateUnauthenticated,
} from './types'
import { userLogout } from './actions'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
  } as AuthState,
  selectors: {
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectUserName: (state) =>
      state.isAuthenticated === true ? state.data.name : null,
    selectUserId: (state) =>
      state.isAuthenticated === true ? state.data.id : null,
    selectAbility: (state) =>
      createAbility(
        state.isAuthenticated === true ? state.data.permissions : [],
      ),
    selectUserPermissions: (state) =>
      state.isAuthenticated === true ? state.data.permissions : [],
    selectActiveBranchId: (state) =>
      state.isAuthenticated === true ? state.data.activeBranchId : null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogout, (state) => {
      if (state.isAuthenticated === false) return

      const unauthenticatedState = state as unknown as AuthStateUnauthenticated
      unauthenticatedState.isAuthenticated = false
      // @ts-ignore
      unauthenticatedState.data = undefined
    })
    builder.addMatcher(
      authApi.endpoints.authLogin.matchFulfilled,
      (state, { payload }) => {
        if (state.isAuthenticated === true) return

        const authenticatedState = state as unknown as AuthStateAuthenticated
        authenticatedState.isAuthenticated = true
        authenticatedState.data = {
          id: payload.user._id,
          name: payload.user.name,
          branchIds: payload.user.branchIds,
          activeBranchId: payload.user.branchIds[0],
          permissions: payload.permissions,
        }
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