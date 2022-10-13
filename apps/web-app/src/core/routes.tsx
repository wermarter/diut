import { Permission } from '@diut/common'

import { MainLayout } from 'src/common/layout/MainLayout'
import { CustomRouteObject } from 'src/common/utils'
import { loadLoginPage, LoginPage } from 'src/modules/auth'
import { ErrorPage } from 'src/common/layout/ErrorPage'
import { DataGridDemo } from 'src/modules/test-grid'
import { HomePage } from 'src/modules/homepage'

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
    isAuthenticated: true,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'users',
        permission: Permission.ManageDoctor,
        element: <DataGridDemo />,
      },
      {
        path: 'doctors',
        permission: Permission.ManageDoctor,
        element: <DataGridDemo />,
      },
      {
        path: 'test-categories',
        permission: Permission.ManageDoctor,
        element: <DataGridDemo />,
      },
      {
        path: 'tests',
        permission: Permission.ManageDoctor,
        element: <DataGridDemo />,
      },
      {
        path: 'test-elements',
        permission: Permission.ManageDoctor,
        element: <DataGridDemo />,
      },
      {
        path: 'patients',
        permission: Permission.ManageDoctor,
        element: <DataGridDemo />,
      },
      {
        path: 'samples',
        permission: Permission.ManageDoctor,
        element: <DataGridDemo />,
      },
      {
        path: 'test-results',
        permission: Permission.ManageDoctor,
        element: <DataGridDemo />,
      },
    ],
  },
]
