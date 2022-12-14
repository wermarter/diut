import { LoaderFunction } from 'react-router-dom'

import { AppNavigate } from 'src/common/utils'
import { appStore } from 'src/core'
import { selectIsAuthenticated } from '../../slice'

export const loginPageLoader: LoaderFunction = () => {
  const isAuthenticated = selectIsAuthenticated(appStore.getState())

  if (isAuthenticated) {
    throw new AppNavigate({ to: '/' })
  }

  return null
}
