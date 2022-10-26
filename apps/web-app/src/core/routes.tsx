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
const TestElementRoute = React.lazy(() => import('src/modules/test-element'))
const IndicationRoute = React.lazy(() => import('src/modules/indication'))
const BioProductRoute = React.lazy(() => import('src/modules/bio-product'))
const SampleTypeRoute = React.lazy(() => import('src/modules/sample-type'))
const TestComboRoute = React.lazy(() => import('src/modules/test-combo'))

const InfoInputRoute = React.lazy(
  () => import('src/modules/sample-info/pages/InfoInputPage')
)
const InfoEditRoute = React.lazy(
  () => import('src/modules/sample-info/pages/InfoEditPage')
)

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
        element: <TestElementRoute />,
      },
      {
        path: 'bio-products',
        permission: Permission.ManageCore,
        element: <BioProductRoute />,
      },
      {
        path: 'sample-types',
        permission: Permission.ManageCore,
        element: <SampleTypeRoute />,
      },
      {
        path: 'test-combos',
        permission: Permission.ManageCore,
        element: <TestComboRoute />,
      },
      // ------------------------------------------------
      {
        path: 'info-input',
        permission: Permission.ManageInfo,
        element: <InfoInputRoute />,
      },
      {
        path: 'info-edit',
        permission: Permission.ManageInfo,
        element: <InfoEditRoute />,
      },
      {
        path: 'result-input',
        permission: Permission.ManageResult,
        element: <DataGridDemo />,
      },
      {
        path: 'result-edit',
        permission: Permission.ManageResult,
        element: <DataGridDemo />,
      },
      {
        path: 'result-print',
        permission: Permission.ManageResult,
        element: <DataGridDemo />,
      },
    ],
  },
]
