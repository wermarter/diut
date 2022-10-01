import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import _ from 'lodash-es'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { AppPermission } from 'src/common/types'
import { RootState } from 'src/core'

interface AuthState {
  name?: string
  accessToken?: string
  permissions?: AppPermission[]
}

const initialState: AuthState = {}

interface UserCredentials {
  username: string
  password: string
}

interface UserLoginPayload {
  name: string
  accessToken: string
}

export const userLogin = createAsyncThunk(
  'auth/login',
  async (
    { username, password }: UserCredentials,
    thunkAPI
  ): Promise<UserLoginPayload> => {
    // const response = await fetch(`${config.apiUrl}/login`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ userId, password }),
    // })
    // if (!response.ok) {
    //   thunkAPI.rejectWithValue(response)
    // }
    // return response.json()
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            name: username,
            accessToken: 'supersecrettoken',
          }),
        2000
      )
    })
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.name = payload.name
      state.accessToken = payload.accessToken
    })
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
  !_.isNil(state.auth.accessToken)
export const selectUserPermissions = (state: RootState) =>
  state.auth.permissions
