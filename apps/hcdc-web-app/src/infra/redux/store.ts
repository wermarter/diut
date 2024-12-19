import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from 'redux-persist'
import { authReducer, authSlice } from 'src/features/auth'
import { accessServiceApiSlice } from 'src/infra/api'

const reducers = {
  [accessServiceApiSlice.reducerPath]: accessServiceApiSlice.reducer,
  [authSlice.name]: authReducer,
}

export const appStore = configureStore({
  reducer: combineReducers(reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([accessServiceApiSlice.middleware]),
})

// allow API slice refetchOnReconnect
setupListeners(appStore.dispatch)

export const appStorePersistor = persistStore(appStore)

export type AppDispatch = typeof appStore.dispatch
export type RootState = ReturnType<typeof appStore.getState>

export const useTypedDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
