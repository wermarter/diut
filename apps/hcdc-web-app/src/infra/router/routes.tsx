import { MainLayout } from 'src/components/layout'
import { LoginPage, urlLoginPage } from 'src/features/auth'
import {
  ManageDiagnosisPage,
  urlManageDiagnosisPage,
} from 'src/features/diagnosis'
import { ManageDoctorPage, urlManageDoctorPage } from 'src/features/doctor'
import { HomePage } from 'src/features/homepage'
import { PatientSearchPage, urlPatientSearchPage } from 'src/features/patient'
import {
  ManagePatientTypePage,
  urlManagePatientTypePage,
} from 'src/features/patient-type'
import {
  ManagePrintFormPage,
  urlManagePrintFormPage,
} from 'src/features/print-form'
import {
  ReportExportPage,
  SoNhanMauPage,
  reportExportPageLoader,
  soNhanMauPageLoader,
  urlReportExportPage,
  urlSoNhanMauPage,
} from 'src/features/report'
import {
  InfoConfirmPage,
  InfoEditPage,
  InfoInputPage,
  infoConfirmPageLoader,
  infoEditPageLoader,
  infoInputPageLoader,
  urlInfoConfirmPage,
  urlInfoEditPage,
  urlInfoInputPage,
} from 'src/features/sample-info'
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
import {
  ManageSampleTypePage,
  urlManageSampleTypePage,
} from 'src/features/sample-type'
import {
  ManageTestPage,
  manageTestPageLoader,
  urlManageTestPage,
} from 'src/features/test'
import {
  ManageTestCategoryPage,
  urlManageTestCategoryPage,
} from 'src/features/test-category'
import {
  ManageTestComboPage,
  urlManageTestComboPage,
} from 'src/features/test-combo'
import {
  ManageTestElementPage,
  manageTestElementPageLoader,
  urlManageTestElementPage,
} from 'src/features/test-element'
import {
  ManageUserPage,
  manageUserPageLoader,
  urlManageUserPage,
} from 'src/features/user'
import { CustomRouteObject } from 'src/infra/router'

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
      {
        path: urlManageUserPage(),
        element: <ManageUserPage />,
        loader: manageUserPageLoader,
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
        loader: soNhanMauPageLoader,
      },
      {
        path: urlReportExportPage(),
        element: <ReportExportPage />,
        loader: reportExportPageLoader,
      },
    ],
  },
]
