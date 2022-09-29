import {
  combineReducers,
  configureStore,
  createAction,
  isRejectedWithValue,
} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { Reducer, Middleware } from 'redux'
import {
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import { layoutReducer, layoutSlice } from 'src/common/layout/slice'

import { authReducer, authSlice } from 'src/modules/auth'

const reducers = {
  [authSlice.name]: authReducer,
  [layoutSlice.name]: layoutReducer,
}

const combinedReducer = combineReducers<typeof reducers>(reducers)

// Reset store state on user logout or token expiration
export const RESET_STORE_STATE = 'resetStoreState'
export const resetStoreState = createAction(RESET_STORE_STATE, () => {
  return { payload: null }
})

const unauthenticatedMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action) && action.payload.status === 401) {
      dispatch(resetStoreState())
    }

    return next(action)
  }

export const rootReducer: Reducer<RootState> = (state, action) => {
  if (action.type === RESET_STORE_STATE) {
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
    }).concat([unauthenticatedMiddleware]),
})

// allow API slice refetchOnReconnect
setupListeners(appStore.dispatch)

export const appPersistor = persistStore(appStore)

export type AppDispatch = typeof appStore.dispatch
export type RootState = ReturnType<typeof combinedReducer>

export const useTypedDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
