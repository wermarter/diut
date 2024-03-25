import { MainLayout } from 'src/components/layout'
import { CustomRouteObject } from 'src/infra/router'
import {
  urlInfoEditPage,
  infoEditPageLoader,
  infoConfirmPageLoader,
  infoInputPageLoader,
  urlInfoConfirmPage,
  urlInfoInputPage,
  InfoInputPage,
  InfoConfirmPage,
  InfoEditPage,
} from 'src/features/sample-info'
import { LoginPage, urlLoginPage } from 'src/features/auth'
import { ManageDoctorPage, urlManageDoctorPage } from 'src/features/doctor'
import {
  ManagePatientTypePage,
  urlManagePatientTypePage,
} from 'src/features/patient-type'
import {
  ManageDiagnosisPage,
  urlManageDiagnosisPage,
} from 'src/features/diagnosis'
import {
  ManageTestCategoryPage,
  urlManageTestCategoryPage,
} from 'src/features/test-category'
import {
  urlManageTestPage,
  manageTestPageLoader,
  ManageTestPage,
} from 'src/features/test'
import {
  ManageTestElementPage,
  manageTestElementPageLoader,
  urlManageTestElementPage,
} from 'src/features/test-element'
import {
  ManageSampleTypePage,
  urlManageSampleTypePage,
} from 'src/features/sample-type'
import {
  ManageTestComboPage,
  urlManageTestComboPage,
} from 'src/features/test-combo'
import {
  ManagePrintFormPage,
  urlManagePrintFormPage,
} from 'src/features/print-form'
import { HomePage } from 'src/features/homepage'
import {
  PrintSelectPage,
  ResultEditPage,
  ResultSelectPage,
  printSelectPageLoader,
  resultEditPageLoader,
  resultSelectPageLoader,
  urlPrintSelectPage,
  urlResultEditPage,
  urlResultSelectPage,
} from 'src/features/sample-result'
import { PatientSearchPage, urlPatientSearchPage } from 'src/features/patient'
import { SoNhanMauPage, urlSoNhanMauPage } from 'src/features/report'

export const appRoutes: CustomRouteObject[] = [
  {
    path: urlLoginPage(),
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
        path: urlManageDoctorPage(),
        element: <ManageDoctorPage />,
      },
      {
        path: urlManagePatientTypePage(),
        element: <ManagePatientTypePage />,
      },
      {
        path: urlManageTestCategoryPage(),
        element: <ManageTestCategoryPage />,
      },
      {
        path: urlManageDiagnosisPage(),
        element: <ManageDiagnosisPage />,
      },
      {
        path: urlManageSampleTypePage(),
        element: <ManageSampleTypePage />,
      },
      {
        path: urlManageTestComboPage(),
        element: <ManageTestComboPage />,
      },
      {
        path: urlManagePrintFormPage(),
        element: <ManagePrintFormPage />,
      },
      {
        path: urlManageTestPage(),
        element: <ManageTestPage />,
        loader: manageTestPageLoader,
      },
      {
        path: urlManageTestElementPage(),
        element: <ManageTestElementPage />,
        loader: manageTestElementPageLoader,
      },
      // ------------------------------------------------------------------------
      {
        path: urlInfoInputPage(),
        element: <InfoInputPage />,
        loader: infoInputPageLoader,
      },
      {
        path: urlInfoConfirmPage(),
        element: <InfoConfirmPage />,
        loader: infoConfirmPageLoader,
      },
      {
        path: urlInfoEditPage(),
        element: <InfoEditPage />,
        loader: infoEditPageLoader,
      },
      {
        path: urlResultSelectPage(),
        element: <ResultSelectPage />,
        loader: resultSelectPageLoader,
      },
      {
        path: urlResultEditPage(),
        element: <ResultEditPage />,
        loader: resultEditPageLoader,
      },
      {
        path: urlPrintSelectPage(),
        element: <PrintSelectPage />,
        loader: printSelectPageLoader,
      },
      {
        path: urlPatientSearchPage(),
        element: <PatientSearchPage />,
      },
      {
        path: urlSoNhanMauPage(),
        element: <SoNhanMauPage />,
      },
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
    ],
  },
]
