import React from 'react'
import { Outlet } from 'react-router-dom'

import HomePage from 'src/features/homepage/pages/Homepage'
import { MainLayout } from 'src/components/layout/MainLayout'
import { CustomRouteObject } from 'src/infra/router'
// import { infoEditPageLoader } from 'src/features/sample-info/pages/InfoEditPage/loader'
// import { editResultPageLoader } from 'src/features/sample-result/pages/EditResultPage/loader'
// import { infoInputPageLoader } from 'src/features/sample-info/pages/InfoInputPage/loader'
// import { infoConfirmPageLoader } from 'src/features/sample-info/pages/InfoConfirmPage/loader'
// import { editSelectPageLoader } from 'src/features/sample-result/pages/EditSelectPage/loader'
import { manageTestPageLoader } from 'src/features/test/pages/ManageTestPage/loader'
// import { manageTestElemenentPageLoader } from 'src/features/test-element/pages/ManageTestElementPage/loader'
// import { printSelectPageLoader } from 'src/features/sample-result/pages/PrintSelectPage/loader'
// import { testReportPageLoader } from 'src/features/report/pages/TestReportPage/loader'
// import { exportReportPageLoader } from 'src/features/report/pages/ExportReportPage/loader'

//#region Lazy import pages
const LoginPage = React.lazy(() => import('src/features/auth/pages/LoginPage'))
const ManageDoctorPage = React.lazy(
  () => import('src/features/doctor/pages/ManageDoctorPage'),
)
// const ManageUserPage = React.lazy(
//   () => import('src/features/user/pages/ManageUserPage'),
// )
const ManagePatientTypePage = React.lazy(
  () => import('src/features/patient-type/pages/ManagePatientTypePage'),
)
const ManageTestCategoryPage = React.lazy(
  () => import('src/features/test-category/pages/ManageTestCategoryPage'),
)
const ManageTestPage = React.lazy(
  () => import('src/features/test/pages/ManageTestPage'),
)
// const ManageTestElementPage = React.lazy(
//   () => import('src/features/test-element/pages/ManageTestElementPage'),
// )
const ManageDiagnosisPage = React.lazy(
  () => import('src/features/diagnosis/pages/ManageDiagnosisPage'),
)
const ManageBioProductPage = React.lazy(
  () => import('src/features/bio-product/pages/ManageBioProductPage'),
)
const ManageSampleTypePage = React.lazy(
  () => import('src/features/sample-type/pages/ManageSampleTypePage'),
)
const ManageTestComboPage = React.lazy(
  () => import('src/features/test-combo/pages/ManageTestComboPage'),
)
const ManagePrintFormPage = React.lazy(
  () => import('src/features/print-form/pages/ManagePrintFormPage'),
)
// const InfoInputPage = React.lazy(
//   () => import('src/features/sample-info/pages/InfoInputPage'),
// )
// const InfoEditPage = React.lazy(
//   () => import('src/features/sample-info/pages/InfoEditPage'),
// )
// const InfoConfirmPage = React.lazy(
//   () => import('src/features/sample-info/pages/InfoConfirmPage'),
// )
// const EditResultPage = React.lazy(
//   () => import('src/features/sample-result/pages/EditResultPage'),
// )
// const EditSelectPage = React.lazy(
//   () => import('src/features/sample-result/pages/EditSelectPage'),
// )
// const PrintSelectPage = React.lazy(
//   () => import('src/features/sample-result/pages/PrintSelectPage'),
// )
// const TestReportPage = React.lazy(
//   () => import('src/features/report/pages/TestReportPage'),
// )
// const ExportReportPage = React.lazy(
//   () => import('src/features/report/pages/ExportReportPage'),
// )
// const SearchPatientPage = React.lazy(
//   () => import('src/features/patient/pages/SearchPatientPage'),
// )
//#endregion

export const appRoutes: CustomRouteObject[] = [
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <MainLayout />,
    authenticatedOnly: true,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'manage',
        element: <Outlet />,
        children: [
          // {
          //   path: 'users',
          //   element: <ManageUserPage />,
          // },
          {
            path: 'doctors',
            element: <ManageDoctorPage />,
          },
          {
            path: 'patient-types',
            element: <ManagePatientTypePage />,
          },
          {
            path: 'diagnoses',
            element: <ManageDiagnosisPage />,
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
          // {
          //   path: 'test-elements',
          //   element: <ManageTestElementPage />,
          //   loader: manageTestElemenentPageLoader,
          // },
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
          // {
          //   path: 'print-forms',
          //   element: <ManagePrintFormPage />,
          // },
        ],
      },
      // ------------------------------------------------------------------------
      // {
      //   path: 'info',
      //   element: <Outlet />,
      //   children: [
      //     {
      //       index: true,
      //       element: <InfoInputPage />,
      //       loader: infoInputPageLoader,
      //     },
      //     {
      //       path: 'edit/:patientId/:sampleId',
      //       element: <InfoEditPage />,
      //       loader: infoEditPageLoader,
      //     },
      //     {
      //       path: 'confirm',
      //       element: <InfoConfirmPage />,
      //       loader: infoConfirmPageLoader,
      //     },
      //   ],
      // },
      // {
      //   path: 'result',
      //   element: <Outlet />,
      //   children: [
      //     {
      //       index: true,
      //       element: <EditSelectPage />,
      //       loader: editSelectPageLoader,
      //     },
      //     {
      //       path: 'edit/:patientId/:sampleId',
      //       element: <EditResultPage />,
      //       loader: editResultPageLoader,
      //     },
      //     {
      //       path: 'print',
      //       element: <PrintSelectPage />,
      //       loader: printSelectPageLoader,
      //     },
      //   ],
      // },
      // {
      //   path: 'report',
      //   element: <Outlet />,
      //   children: [
      //     {
      //       path: 'test',
      //       element: <TestReportPage />,
      //       loader: testReportPageLoader,
      //     },
      //     {
      //       path: 'export',
      //       element: <ExportReportPage />,
      //       loader: exportReportPageLoader,
      //     },
      //   ],
      // },
      // {
      //   path: 'patient',
      //   element: <Outlet />,
      //   children: [
      //     {
      //       path: 'search',
      //       element: <SearchPatientPage />,
      //     },
      //   ],
      // },
    ],
  },
]
