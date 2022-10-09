import { createAction, isRejectedWithValue, Middleware } from '@reduxjs/toolkit'

// Reset store state on user logout or token expiration
export const RESET_STORE_STATE = 'resetStoreState'
export const resetStoreState = createAction(RESET_STORE_STATE, () => {
  return { payload: null }
})

export const unauthenticatedMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action) && action.payload.status === 401) {
      dispatch(resetStoreState())
    }

    return next(action)
  }
