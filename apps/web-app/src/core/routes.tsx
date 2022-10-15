import React from 'react'
import { Permission } from '@diut/common'

import { MainLayout } from 'src/common/layout/MainLayout'
import { CustomRouteObject } from 'src/common/utils'
import { loadLoginPage, LoginPage } from 'src/modules/auth'
import { ErrorPage } from 'src/common/layout/ErrorPage'
import { DataGridDemo } from 'src/modules/test-grid'
import { HomePage } from 'src/modules/homepage'

const DoctorRoute = React.lazy(() => import('src/modules/doctor'))
const UserRoute = React.lazy(() => import('src/modules/user'))

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
        permission: Permission.ManageUser,
        element: <UserRoute />,
      },
      {
        path: 'doctors',
        permission: Permission.ManageDoctor,
        element: <DoctorRoute />,
      },
      {
        path: 'test-categories',
        permission: Permission.ManageTestCategory,
        element: <DataGridDemo />,
      },
      {
        path: 'tests',
        permission: Permission.ManageTest,
        element: <DataGridDemo />,
      },
      {
        path: 'test-elements',
        permission: Permission.ManageTestElement,
        element: <DataGridDemo />,
      },
      {
        path: 'patients',
        permission: Permission.ManagePatient,
        element: <DataGridDemo />,
      },
      {
        path: 'samples',
        permission: Permission.ManageSample,
        element: <DataGridDemo />,
      },
      {
        path: 'test-results',
        permission: Permission.ManageTestResult,
        element: <DataGridDemo />,
      },
    ],
  },
]
