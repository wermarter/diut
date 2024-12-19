import { BranchType, PermissionRule } from '@diut/hcdc'
import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { authApi } from 'src/infra/api/access-service/auth'
import { userLogout } from './actions'
import {
  AuthState,
  AuthStateAuthenticated,
  AuthStateUnauthenticated,
} from './types'

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
    selectUserPermissions: (state) =>
      state.isAuthenticated === true ? state.data.permissions : [],
    selectActiveBranchId: (state) =>
      state.isAuthenticated === true ? state.data.activeBranchId : null,
    selectBranches: (state) =>
      state.isAuthenticated === true ? state.data.branches : null,
    selectActiveBranch: (state, activeBranchId) =>
      state.isAuthenticated === true
        ? state.data.branches.find(({ _id }) => _id === activeBranchId)
        : undefined,
  },
  reducers: {
    setActiveBranchId: (
      state,
      { payload }: { payload: { branchId: string } },
    ) => {
      if (state.isAuthenticated === true) {
        state.data.activeBranchId = payload.branchId
      }
    },
  },
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
          branches: payload.user.branches?.toSorted((a, b) => {
            if (a.type === b.type) {
              return a.displayIndex - b.displayIndex
            }

            if (a.type === BranchType.Internal) {
              return -1
            } else {
              return +1
            }
          })!,
          activeBranchId: payload.user.branchIds[0],
          permissions: payload.permissions as unknown as PermissionRule[],
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
