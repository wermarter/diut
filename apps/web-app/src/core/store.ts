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
import {
  authReducer,
  authSlice,
  unauthenticatedMiddleware,
  USER_LOGOUT,
} from 'src/modules/auth'

const reducers = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  [authSlice.name]: authReducer,
  [layoutSlice.name]: layoutReducer,
}

const combinedReducer = combineReducers<typeof reducers>(reducers)

export const rootReducer: Reducer<RootState> = (state, action) => {
  if (action.type === USER_LOGOUT) {
    localStorage.clear()
    location.reload()
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
