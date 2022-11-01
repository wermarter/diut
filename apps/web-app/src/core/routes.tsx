import React from 'react'
import { Permission } from '@diut/common'
import { Outlet } from 'react-router-dom'

import { MainLayout } from 'src/common/layout/MainLayout'
import { CustomRouteObject } from 'src/common/utils'
import { loadLoginPage, LoginPage } from 'src/modules/auth'
import { ErrorPage } from 'src/common/layout/ErrorPage'
import { HomePage } from 'src/modules/homepage'
import { sampleApi } from 'src/api/sample'
import { appStore } from './store'
import { patientApi } from 'src/api/patient'

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
const InfoConfirmRoute = React.lazy(
  () => import('src/modules/sample-info/pages/InfoConfirmPage')
)

const EditResultRoute = React.lazy(
  () => import('src/modules/sample-result/pages/EditResultPage')
)
const EditSelectRoute = React.lazy(
  () => import('src/modules/sample-result/pages/EditSelectPage')
)
const PrintSelectRoute = React.lazy(
  () => import('src/modules/sample-result/pages/PrintSelectPage')
)
const PrintResultRoute = React.lazy(
  () => import('src/modules/sample-result/pages/PrintResultPage')
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
        path: 'info',
        permission: Permission.ManageInfo,
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <InfoInputRoute />,
          },
          {
            path: 'edit/:patientId/:sampleId',
            element: <InfoEditRoute />,
            loader: async ({ params }) => {
              const { sampleId, patientId } = params
              if (sampleId !== undefined && patientId !== undefined) {
                return Promise.all([
                  appStore
                    .dispatch(
                      sampleApi.endpoints.sampleFindById.initiate({
                        id: sampleId,
                      })
                    )
                    .unwrap(),
                  appStore
                    .dispatch(
                      patientApi.endpoints.patientFindById.initiate({
                        id: patientId,
                      })
                    )
                    .unwrap(),
                ])
              }
            },
          },
          {
            path: 'confirm',
            element: <InfoConfirmRoute />,
          },
        ],
      },
      {
        path: 'result',
        permission: Permission.ManageResult,
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <EditSelectRoute />,
          },
          {
            path: 'edit/:patientId/:sampleId',
            element: <EditResultRoute />,
            loader: async ({ params }) => {
              const { sampleId, patientId } = params
              if (sampleId !== undefined && patientId !== undefined) {
                return Promise.all([
                  appStore
                    .dispatch(
                      sampleApi.endpoints.sampleFindById.initiate({
                        id: sampleId,
                      })
                    )
                    .unwrap(),
                  appStore
                    .dispatch(
                      patientApi.endpoints.patientFindById.initiate({
                        id: patientId,
                      })
                    )
                    .unwrap(),
                ])
              }
            },
          },
          {
            path: 'print-select',
            element: <PrintSelectRoute />,
          },
          {
            path: 'print/:patientId/:sampleId',
            element: <PrintResultRoute />,
            loader: async ({ params }) => {
              const { sampleId, patientId } = params
              if (sampleId !== undefined && patientId !== undefined) {
                return Promise.all([
                  appStore
                    .dispatch(
                      sampleApi.endpoints.sampleFindById.initiate({
                        id: sampleId,
                      })
                    )
                    .unwrap(),
                  appStore
                    .dispatch(
                      patientApi.endpoints.patientFindById.initiate({
                        id: patientId,
                      })
                    )
                    .unwrap(),
                ])
              }
            },
          },
        ],
      },
    ],
  },
]
