import { createBrowserRouter, Navigate } from 'react-router-dom'

import { MainLayout } from 'src/common/layout/MainLayout'
import { LoginPage } from 'src/modules/auth'
import { TestContentPage } from 'src/modules/example'

export const appRouter = createBrowserRouter([
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
          return new Promise((resolve) => {
            setTimeout(() => resolve({}), 1000)
          })
        },
      },
      {
        path: '2',
        element: <TestContentPage someText="This is page 2" />,
        loader: async () => {
          return new Promise((resolve) => {
            setTimeout(() => resolve({}), 1000)
          })
        },
      },
    ],
  },
])
