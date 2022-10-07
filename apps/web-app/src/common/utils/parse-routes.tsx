import _ from 'lodash-es'
import { RouteObject } from 'react-router-dom'

import { AppPermission } from 'src/common/types'
import {
  AuthenticationCheck,
  authenticationInjector,
  authorizationInjector,
} from 'src/modules/auth'
import { combineInjectors, RouteInjectors, makeInjector } from './inject-loader'

export type CustomRouteObject = Omit<RouteObject, 'children'> & {
  children?: CustomRouteObject[]
  permission?: AppPermission
  isAuthenticated?: boolean
}

export function parseRoutes(
  routes: CustomRouteObject[],
  authInjectors?: RouteInjectors
): RouteObject[] {
  return routes.map(
    ({
      isAuthenticated,
      permission,
      children,
      loader,
      element,
      ...otherRouteProps
    }) => {
      // Route element wrappers
      let customElement = _.clone(element)
      if (isAuthenticated) {
        customElement = (
          <AuthenticationCheck>{customElement}</AuthenticationCheck>
        )
      }

      // Route injectors
      const injectors = _.clone(authInjectors) ?? []
      if (isAuthenticated) {
        injectors.push(makeInjector(authenticationInjector, {}))
      }
      if (permission !== undefined) {
        injectors.push(
          makeInjector(authorizationInjector, {
            requestedPermission: permission,
          })
        )
      }
      const customLoader = combineInjectors(loader ?? (() => {}), injectors)

      // Recursive call for children
      let customChildren: RouteObject[] = []
      if (children !== undefined && Array.isArray(children)) {
        customChildren = parseRoutes(children, injectors)
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
