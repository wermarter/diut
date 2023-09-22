import { Suspense } from 'react'
import _ from 'lodash'
import {
  IndexRouteObject,
  NonIndexRouteObject,
  RouteObject,
} from 'react-router-dom'
import { Permission } from '@diut/bathanghai-common'

import {
  AuthenticationCheck,
  authenticationInjector,
  authorizationInjector,
} from 'src/modules/auth'
import { combineInjectors, RouteInjectors, makeInjector } from './inject-loader'
import { LoadingPage } from '../layout/LoadingPage'
import { ErrorPage } from '../layout/ErrorPage'

export type AdditionalRouteProps = {
  permissionAnyOf?: Permission[]
  permissionAllOf?: Permission[]
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
  authInjectors?: RouteInjectors,
): RouteObject[] {
  return routes.map((customRouteObject) => {
    const {
      isAuthenticated,
      permissionAnyOf,
      permissionAllOf,
      children,
      loader,
      element,
    } = customRouteObject

    // Route element wrappers
    let customElement = _.clone(element)
    if (isAuthenticated) {
      customElement = <AuthenticationCheck>{customElement}</AuthenticationCheck>
    }
    customElement = (
      <Suspense fallback={<LoadingPage />}>{customElement}</Suspense>
    )

    // Route injectors
    const injectors = _.clone(authInjectors) ?? []
    if (isAuthenticated) {
      injectors.push(makeInjector(authenticationInjector, {}))
    }
    if (permissionAllOf !== undefined || permissionAnyOf !== undefined) {
      injectors.push(
        makeInjector(authorizationInjector, {
          permissionAllOf,
          permissionAnyOf,
        }),
      )
    }
    const customLoader = combineInjectors(loader ?? (() => null), injectors)

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
      errorElement: <ErrorPage />,
    }
  })
}
