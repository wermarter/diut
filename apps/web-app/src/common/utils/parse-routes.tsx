import _ from 'lodash-es'
import { RouteObject } from 'react-router-dom'

import { AppPermission } from 'src/common/types'
import {
  AuthenticationCheck,
  authenticationLoader,
  authorizationLoader,
} from 'src/modules/auth'

export type CustomRouteObject = Omit<RouteObject, 'children'> & {
  children?: CustomRouteObject[]
  permission?: AppPermission
  isAuthenticated?: boolean
}

export function parseRoutes(routes: CustomRouteObject[]): RouteObject[] {
  return routes.map(
    ({
      isAuthenticated,
      permission,
      children,
      loader,
      element,
      ...otherRouteProps
    }) => {
      // Element wrapper
      let customElement = _.clone(element)
      if (isAuthenticated) {
        customElement = (
          <AuthenticationCheck>{customElement}</AuthenticationCheck>
        )
      }

      // Loader wrapper
      let customLoader = loader
      if (permission !== undefined) {
        customLoader = authorizationLoader(permission, customLoader)
      }
      if (isAuthenticated) {
        customLoader = authenticationLoader(customLoader)
      }

      // Children wrapper
      let customChildren: RouteObject[] = []
      if (children !== undefined && Array.isArray(children)) {
        customChildren = parseRoutes(children)
      }

      return {
        ...otherRouteProps,
        loader: customLoader,
        element: customElement,
        children: customChildren,
      }
    }
  )
}
