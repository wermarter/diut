import { AppPermission } from 'src/common/types'
import { MainLayout } from 'src/common/layout/MainLayout'
import { CustomRouteObject } from 'src/common/utils'
import { loadLoginPage, LoginPage } from 'src/modules/auth'
import { TestContentPage } from 'src/modules/example'
import { ErrorPage } from 'src/common/layout/ErrorPage'

export const appRoutes: CustomRouteObject[] = [
  {
    path: 'login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
    loader: loadLoginPage,
  },
  {
    path: '/',
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
          await new Promise((r) =>
            setTimeout(() => {
              console.log('second log')
              r({})
            })
          )
        },
      },
      {
        path: '2',
        element: <TestContentPage someText="This is page 2" />,
        loader: async () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              console.log('ối, load mất r')
              resolve({})
            }, 1000)
          })
        },
      },
      {
        path: '3',
        element: <TestContentPage someText="This is page 3" />,
        permission: AppPermission.Weird,
        loader: () => {
          // throw 'super_weird'
        },
      },
    ],
  },
]
