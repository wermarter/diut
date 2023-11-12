import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from 'src/core'

interface LayoutState {
  currentActivity: string
}

const initialState: LayoutState = {
  currentActivity: 'Loading...',
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setCurrentActivity(state, action: PayloadAction<string>) {
      state.currentActivity = action.payload
    },
  },
})

export const layoutReducer = layoutSlice.reducer

export const { setCurrentActivity } = layoutSlice.actions

export const selectCurrentActivity = (state: RootState) =>
  state.layout.currentActivity
