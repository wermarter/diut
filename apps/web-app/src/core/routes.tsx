import React from 'react'
import { Permission } from '@diut/common'
import { Outlet } from 'react-router-dom'

import { MainLayout } from 'src/common/layout/MainLayout'
import { CustomRouteObject } from 'src/common/utils'
import LoginPage, { loginPageLoader } from 'src/modules/auth/pages/LoginPage'
import { ErrorPage } from 'src/common/layout/ErrorPage'
import HomePage from 'src/modules/homepage/pages/Homepage'
import { infoEditPageLoader } from 'src/modules/sample-info/pages/InfoEditPage/loader'
import { editResultPageLoader } from 'src/modules/sample-result/pages/EditResultPage/loader'
import { infoInputPageLoader } from 'src/modules/sample-info/pages/InfoInputPage/loader'
import { infoConfirmPageLoader } from 'src/modules/sample-info/pages/InfoConfirmPage/loader'
import { editSelectPageLoader } from 'src/modules/sample-result/pages/EditSelectPage/loader'
import { manageTestPageLoader } from 'src/modules/test/pages/ManageTestPage/loader'
import { manageTestElemenentPageLoader } from 'src/modules/test-element/pages/ManageTestElementPage/loader'
import { printSelectPageLoader } from 'src/modules/sample-result/pages/PrintSelectPage/loader'
import { testReportPageLoader } from 'src/modules/report/pages/TestReportPage/loader'

//#region Lazy import pages
const ManageDoctorPage = React.lazy(
  () => import('src/modules/doctor/pages/ManageDoctorPage')
)
const ManageUserPage = React.lazy(
  () => import('src/modules/user/pages/ManageUserPage')
)
const ManagePatientTypePage = React.lazy(
  () => import('src/modules/patient-type/pages/ManagePatientTypePage')
)
const ManageTestCategoryPage = React.lazy(
  () => import('src/modules/test-category/pages/ManageTestCategoryPage')
)
const ManageTestPage = React.lazy(
  () => import('src/modules/test/pages/ManageTestPage')
)
const ManageTestElementPage = React.lazy(
  () => import('src/modules/test-element/pages/ManageTestElementPage')
)
const ManageIndicationPage = React.lazy(
  () => import('src/modules/indication/pages/ManageIndicationPage')
)
const ManageBioProductPage = React.lazy(
  () => import('src/modules/bio-product/pages/ManageBioProductPage')
)
const ManageSampleTypePage = React.lazy(
  () => import('src/modules/sample-type/pages/ManageSampleTypePage')
)
const ManageTestComboPage = React.lazy(
  () => import('src/modules/test-combo/pages/ManageTestComboPage')
)
const ManagePrintFormPage = React.lazy(
  () => import('src/modules/print-form/pages/ManagePrintFormPage')
)
const InfoInputPage = React.lazy(
  () => import('src/modules/sample-info/pages/InfoInputPage')
)
const InfoEditPage = React.lazy(
  () => import('src/modules/sample-info/pages/InfoEditPage')
)
const InfoConfirmPage = React.lazy(
  () => import('src/modules/sample-info/pages/InfoConfirmPage')
)
const EditResultPage = React.lazy(
  () => import('src/modules/sample-result/pages/EditResultPage')
)
const EditSelectPage = React.lazy(
  () => import('src/modules/sample-result/pages/EditSelectPage')
)
const PrintSelectPage = React.lazy(
  () => import('src/modules/sample-result/pages/PrintSelectPage')
)
const TestReportPage = React.lazy(
  () => import('src/modules/report/pages/TestReportPage')
)
const ExportReportPage = React.lazy(
  () => import('src/modules/report/pages/ExportReportPage')
)
const SearchPatientPage = React.lazy(
  () => import('src/modules/patient/pages/SearchPatientPage')
)
//#endregion

export const appRoutes: CustomRouteObject[] = [
  {
    path: 'login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
    loader: loginPageLoader,
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
        path: 'manage',
        permissionAnyOf: [Permission.Admin],
        element: <Outlet />,
        children: [
          {
            path: 'users',
            element: <ManageUserPage />,
          },
          {
            path: 'doctors',
            element: <ManageDoctorPage />,
          },
          {
            path: 'patient-types',
            element: <ManagePatientTypePage />,
          },
          {
            path: 'indications',
            element: <ManageIndicationPage />,
          },
          {
            path: 'test-categories',
            element: <ManageTestCategoryPage />,
          },
          {
            path: 'tests',
            element: <ManageTestPage />,
            loader: manageTestPageLoader,
          },
          {
            path: 'test-elements',
            element: <ManageTestElementPage />,
            loader: manageTestElemenentPageLoader,
          },
          {
            path: 'bio-products',
            element: <ManageBioProductPage />,
          },
          {
            path: 'sample-types',
            element: <ManageSampleTypePage />,
          },
          {
            path: 'test-combos',
            element: <ManageTestComboPage />,
          },
          {
            path: 'print-forms',
            element: <ManagePrintFormPage />,
          },
        ],
      },
      // ------------------------------------------------------------------------
      {
        path: 'info',
        permissionAnyOf: [Permission.ManageInfo],
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <InfoInputPage />,
            loader: infoInputPageLoader,
          },
          {
            path: 'edit/:patientId/:sampleId',
            element: <InfoEditPage />,
            loader: infoEditPageLoader,
          },
          {
            path: 'confirm',
            element: <InfoConfirmPage />,
            loader: infoConfirmPageLoader,
          },
        ],
      },
      {
        path: 'result',
        permissionAnyOf: [Permission.ManageResult],
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <EditSelectPage />,
            loader: editSelectPageLoader,
          },
          {
            path: 'edit/:patientId/:sampleId',
            element: <EditResultPage />,
            loader: editResultPageLoader,
          },
          {
            path: 'print',
            element: <PrintSelectPage />,
            loader: printSelectPageLoader,
          },
        ],
      },
      {
        path: 'report',
        element: <Outlet />,
        children: [
          {
            path: 'test',
            element: <TestReportPage />,
            permissionAnyOf: [Permission.ViewTestReport],
            loader: testReportPageLoader,
          },
          {
            path: 'export',
            element: <ExportReportPage />,
            permissionAnyOf: [
              Permission.ExportCTM,
              Permission.ExportHCG,
              Permission.ExportHIV,
              Permission.ExportPapSmear,
              Permission.ExportSinhHoa,
              Permission.ExportTD,
              Permission.ExportThinPrep,
              Permission.ExportUrine10,
              Permission.ExportSoiNhuom,
              Permission.ExportTraKQ,
            ],
          },
        ],
      },
      {
        path: 'patient',
        element: <Outlet />,
        children: [
          {
            path: 'search',
            permissionAnyOf: [Permission.ManageResult],
            element: <SearchPatientPage />,
          },
        ],
      },
    ],
  },
]
