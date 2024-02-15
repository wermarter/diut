import { LoaderFunction } from 'react-router-dom'

import { AppNavigate } from 'src/shared/utils'
import { appStore } from 'src/infra/redux'
import { selectIsAuthenticated } from '../../slice'

export const loginPageLoader: LoaderFunction = () => {
  const isAuthenticated = selectIsAuthenticated(appStore.getState())

  if (isAuthenticated) {
    throw new AppNavigate({ to: '/' })
  }

  return null
}
