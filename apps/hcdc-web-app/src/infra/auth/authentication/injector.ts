import { LoaderFunctionArgs } from 'react-router-dom'

import { appStore } from 'src/infra/redux'
import { AppNavigate, InjectorFunction } from 'src/shared/utils'
import { selectIsAuthenticated } from '../../../features/auth/slice'

export const authenticationInjector: InjectorFunction<{}> = (
  args: LoaderFunctionArgs,
) => {
  if (!selectIsAuthenticated(appStore.getState())) {
    throw new AppNavigate({
      to: '/login',
      state: {
        from: args.request.url.split(window.location.origin)[1],
        reason: 'Vui lòng đăng nhập để truy cập vào hệ thống.',
      },
      replace: true,
    })
  }

  return {}
}
