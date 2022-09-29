import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { RootState } from 'src/core'

interface AuthState {
  name?: string
  accessToken?: string
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