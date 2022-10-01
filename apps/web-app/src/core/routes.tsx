import { Navigate } from 'react-router-dom'

import { AppPermission } from 'src/common/types'
import { MainLayout } from 'src/common/layout/MainLayout'
import { CustomRouteObject } from 'src/common/utils'
import { LoginPage } from 'src/modules/auth'
import { TestContentPage } from 'src/modules/example'
import { ErrorPage } from 'src/common/layout/ErrorPage'

export const appRoutes: CustomRouteObject[] = [
  {
    index: true,
    element: <Navigate to="example" />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'example',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    isAuthenticated: true,
    children: [
      {
        index: true,
        element: <TestContentPage someText="This is index page" />,
        loader: async () => {
          return new Promise((resolve) => {
            setTimeout(() => resolve({}), 1000)
          })
        },
      },
      {
        path: '1',
        element: <TestContentPage someText="This is page 1" />,
        loader: async () => {
          throw Error('random shiet')
        },
      },
      {
        path: '2',
        element: <TestContentPage someText="This is page 2" />,
        permission: AppPermission.Overview,
        loader: async () => {
          return new Promise((resolve) => {
            setTimeout(() => resolve({}), 1000)
          })
        },
      },
      {
        path: '3',
        element: <TestContentPage someText="This is page 3" />,
        loader: () => {
          throw 'super_weird'
        },
      },
    ],
  },
]
