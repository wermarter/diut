import _ from 'lodash-es'
import {
  IndexRouteObject,
  NonIndexRouteObject,
  RouteObject,
} from 'react-router-dom'
import { Permission } from '@diut/common'

import {
  AuthenticationCheck,
  authenticationInjector,
  authorizationInjector,
} from 'src/modules/auth'
import { combineInjectors, RouteInjectors, makeInjector } from './inject-loader'

export type AdditionalRouteProps = {
  permission?: Permission
  isAuthenticated?: boolean
}

type CustomIndexRouteObject = IndexRouteObject & AdditionalRouteProps

type CustomNonIndexRouteObject = Omit<NonIndexRouteObject, 'children'> &
  AdditionalRouteProps & {
    children?: CustomRouteObject[]
  }

export type CustomRouteObject =
  | CustomIndexRouteObject
  | CustomNonIndexRouteObject

export function parseRoutes(
  routes: CustomRouteObject[],
  authInjectors?: RouteInjectors
): RouteObject[] {
  return routes.map((customRouteObject) => {
    const { isAuthenticated, permission, children, loader, element } =
      customRouteObject

    // Route element wrappers
    let customElement = _.clone(element)
    if (isAuthenticated) {
      customElement = <AuthenticationCheck>{customElement}</AuthenticationCheck>
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

    // Index route has no children
    if (customRouteObject.index === true) {
      return {
        ...customRouteObject,
        loader: customLoader,
        element: customElement,
      }
    }

    return {
      ...customRouteObject,
      loader: customLoader,
      element: customElement,
      children: customChildren,
    }
  })
}
