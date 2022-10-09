import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { Reducer } from 'redux'
import {
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'

import { apiSlice } from 'src/api/slice'
import { layoutReducer, layoutSlice } from 'src/common/layout/slice'
import { authReducer, authSlice } from 'src/modules/auth'
import { RESET_STORE_STATE, unauthenticatedMiddleware } from './reset'

const reducers = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  [authSlice.name]: authReducer,
  [layoutSlice.name]: layoutReducer,
}

const combinedReducer = combineReducers<typeof reducers>(reducers)

export const rootReducer: Reducer<RootState> = (state, action) => {
  if (action.type === RESET_STORE_STATE) {
    localStorage.clear()
    state = {} as RootState
  }

  return combinedReducer(state, action)
}

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([unauthenticatedMiddleware, apiSlice.middleware]),
})

// allow API slice refetchOnReconnect
setupListeners(appStore.dispatch)

export const appPersistor = persistStore(appStore)

export type AppDispatch = typeof appStore.dispatch
export type RootState = ReturnType<typeof combinedReducer>

export const useTypedDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
