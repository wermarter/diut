import { createAction } from '@reduxjs/toolkit'

export const USER_LOGOUT = 'USER_LOGOUT'
export const userLogout = createAction(USER_LOGOUT, () => {
  return { payload: null }
})
