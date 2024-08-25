import { Suspense } from 'react'
import _ from 'es-toolkit'
import {
  IndexRouteObject,
  NonIndexRouteObject,
  RouteObject,
} from 'react-router-dom'

import { AuthenticationCheck } from 'src/features/auth'
import { ErrorPage } from 'src/components/layout'

export type AdditionalRouteProps = {
  authenticatedOnly?: boolean
}

type CustomIndexRouteObject = IndexRouteObject & AdditionalRouteProps

type CustomNonIndexRouteObject = Omit<NonIndexRouteObject, 'children'> &
  AdditionalRouteProps & {
    children?: CustomRouteObject[]
  }

export type CustomRouteObject =
  | CustomIndexRouteObject
  | CustomNonIndexRouteObject

export function parseRoutes(routes: CustomRouteObject[]): RouteObject[] {
  return routes.map((customRouteObject) => {
    const { authenticatedOnly, children, element, index } = customRouteObject

    // let customElement = _.clone(element)
    let customElement = element

    if (authenticatedOnly) {
      customElement = <AuthenticationCheck>{element}</AuthenticationCheck>
    }

    customElement = <Suspense>{customElement}</Suspense>

    // Recursive call for children
    let customChildren: RouteObject[] = []
    if (Array.isArray(children)) {
      customChildren = parseRoutes(children)
    }

    // Index route has no children
    if (index === true) {
      return {
        ...customRouteObject,
        element: customElement,
        errorElement: <ErrorPage />,
      }
    }

    return {
      ...customRouteObject,
      element: customElement,
      children: customChildren,
      errorElement: <ErrorPage />,
    }
  })
}
