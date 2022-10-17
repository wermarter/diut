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
const PatientTypeRoute = React.lazy(() => import('src/modules/patient-type'))
const TestCategoryRoute = React.lazy(() => import('src/modules/test-category'))
const TestRoute = React.lazy(() => import('src/modules/test'))
const IndicationRoute = React.lazy(() => import('src/modules/indication'))

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
        permission: Permission.ManageCore,
        element: <UserRoute />,
      },
      {
        path: 'doctors',
        permission: Permission.ManageCore,
        element: <DoctorRoute />,
      },
      {
        path: 'patient-types',
        permission: Permission.ManageCore,
        element: <PatientTypeRoute />,
      },
      {
        path: 'indications',
        permission: Permission.ManageCore,
        element: <IndicationRoute />,
      },
      {
        path: 'test-categories',
        permission: Permission.ManageCore,
        element: <TestCategoryRoute />,
      },
      {
        path: 'tests',
        permission: Permission.ManageCore,
        element: <TestRoute />,
      },
      {
        path: 'test-elements',
        permission: Permission.ManageCore,
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
