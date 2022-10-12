import { AppPermission } from '@diut/common'

import { MainLayout } from 'src/common/layout/MainLayout'
import { CustomRouteObject } from 'src/common/utils'
import { loadLoginPage, LoginPage } from 'src/modules/auth'
import { TestContentPage } from 'src/modules/example'
import { ErrorPage } from 'src/common/layout/ErrorPage'

// TODO: Code Splitting please!! React.lazy()

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
    loader: () => {
      console.log('root loader')
    },
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
        loader: () => {},
      },
      {
        path: '4',
        element: <TestContentPage someText="This is page 4" />,
        loader: () => {},
      },
      {
        path: 'test',
        element: <TestContentPage someText="This is Test page" />,
        // permission: AppPermission.Weird,
        loader: () => {
          console.log('test loader')
          throw 'dfdfdfs'
        },
        children: [
          {
            path: 't1',
            // permission: AppPermission.Overview,
            loader: async () => {
              console.log('test/1 loader')
              return new Promise((resolve) => {
                setTimeout(() => {
                  console.log('test/1 loaded')
                  resolve({})
                }, 1000)
              })
            },
            children: [
              {
                path: 't2',
                loader: () => {
                  console.log('test/1/2 loader')
                },
              },
            ],
          },
        ],
      },
    ],
  },
]
