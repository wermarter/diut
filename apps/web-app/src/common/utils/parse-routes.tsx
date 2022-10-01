import _ from 'lodash-es'
import { RouteObject } from 'react-router-dom'

import { AppPermission } from 'src/common/types'
import { AuthorizationCheck, AuthenticationCheck } from 'src/modules/auth'

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
      element,
      children,
      ...otherRouteProps
    }) => {
      let customElement = _.clone(element)

      if (isAuthenticated) {
        customElement = (
          <AuthenticationCheck>{customElement}</AuthenticationCheck>
        )
      }

      if (permission !== undefined) {
        customElement = (
          <AuthorizationCheck permission={permission}>
            {customElement}
          </AuthorizationCheck>
        )
      }

      let customChildren: RouteObject[] = []
      if (children !== undefined && Array.isArray(children)) {
        customChildren = parseRoutes(children)
      }

      return {
        ...otherRouteProps,
        element: customElement,
        children: customChildren,
      }
    }
  )
}
