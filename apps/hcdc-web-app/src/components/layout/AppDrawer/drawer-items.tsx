import {
  AUTH_ACTION_ALL,
  AuthSubject,
  SampleAction,
  WebApp,
  WebAppAction,
  WebAppPage,
} from '@diut/hcdc'
import AccountBoxIcon from '@mui/icons-material/AccountBoxOutlined'
import HomeIcon from '@mui/icons-material/HomeOutlined'
import VaccinesIcon from '@mui/icons-material/VaccinesOutlined'
import BiotechIcon from '@mui/icons-material/BiotechOutlined'
import WorkspacesIcon from '@mui/icons-material/WorkspacesOutlined'
import WorkIcon from '@mui/icons-material/WorkOutline'
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal'
import ManageAccountsIcon from '@mui/icons-material/ManageAccountsOutlined'
import BloodtypeIcon from '@mui/icons-material/BloodtypeOutlined'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'
import Diversity2Icon from '@mui/icons-material/Diversity2'
import PrintIcon from '@mui/icons-material/Print'
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import ListAltIcon from '@mui/icons-material/ListAlt'
import RuleIcon from '@mui/icons-material/Rule'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

import { DrawerItemGroup, authOneOf } from './utils'
import { urlInfoConfirmPage, urlInfoInputPage } from 'src/features/sample-info'
import { urlManageDoctorPage } from 'src/features/doctor'
import { urlManagePatientTypePage } from 'src/features/patient-type'
import { urlManageDiagnosisPage } from 'src/features/diagnosis'
import { urlManageSampleTypePage } from 'src/features/sample-type'
import { urlManageTestCategoryPage } from 'src/features/test-category'
import { urlManageTestPage } from 'src/features/test'
import { urlManageTestElementPage } from 'src/features/test-element'
import { urlManageTestComboPage } from 'src/features/test-combo'
import { urlManagePrintFormPage } from 'src/features/print-form'
import {
  urlPrintSelectPage,
  urlResultSelectPage,
} from 'src/features/sample-result'
import { urlPatientSearchPage } from 'src/features/patient'
import { urlSoNhanMauPage } from 'src/features/report'

export const drawerItems: DrawerItemGroup[] = [
  {
    title: '',
    children: [
      {
        icon: <HomeIcon />,
        label: 'Trang chủ',
        destination: '/',
      },
    ],
  },
  {
    title: '',
    children: [
      {
        icon: <AirlineSeatReclineNormalIcon />,
        label: 'Nhập TT',
        destination: urlInfoInputPage(),
        isAuthorized: authOneOf([
          { subject: AuthSubject.Sample, action: SampleAction.UpdateInfo },
        ]),
      },
      {
        icon: <FaceRetouchingNaturalIcon />,
        label: 'Xác nhận TT',
        destination: urlInfoConfirmPage(),
        isAuthorized: authOneOf([
          { subject: AuthSubject.Sample, action: SampleAction.UpdateInfo },
        ]),
      },
      {
        icon: <AppRegistrationIcon />,
        label: 'Nhập KQ',
        destination: urlResultSelectPage(),
        isAuthorized: authOneOf([
          { subject: AuthSubject.Sample, action: SampleAction.UpdateResult },
        ]),
      },
      {
        icon: <PrintIcon />,
        label: 'In KQ',
        destination: urlPrintSelectPage(),
        isAuthorized: authOneOf([
          { subject: AuthSubject.Sample, action: SampleAction.PrintResult },
        ]),
      },
      {
        icon: <RuleIcon />,
        label: 'Sổ nhận mẫu',
        destination: urlSoNhanMauPage(),
        isAuthorized: authOneOf([
          {
            subject: AuthSubject.WebApp,
            action: WebAppAction.View,
            filterObj: { page: WebAppPage.SoNhanMau } as WebApp,
          },
        ]),
      },
      {
        icon: <PersonSearchIcon />,
        label: 'Tìm kiếm',
        destination: urlPatientSearchPage(),
        isAuthorized: authOneOf([
          { subject: AuthSubject.Sample, action: SampleAction.UpdateInfo },
        ]),
      },
      {
        icon: <FileDownloadIcon />,
        label: 'Xuất báo cáo',
        destination: 'report/export',
        isAuthorized: authOneOf([
          {
            subject: AuthSubject.WebApp,
            action: WebAppAction.Export,
            filterObj: { page: WebAppPage.XuatBaoCao } as WebApp,
          },
        ]),
      },
    ],
  },
  {
    title: 'Quản lý hệ thống',
    children: [
      {
        icon: <ManageAccountsIcon />,
        label: 'Người dùng',
        destination: 'manage/users',
        isAuthorized: authOneOf([
          { subject: AuthSubject.User, action: AUTH_ACTION_ALL },
        ]),
      },
      {
        icon: <AccountBoxIcon />,
        label: 'Bác sĩ',
        destination: urlManageDoctorPage(),
        isAuthorized: authOneOf([
          { subject: AuthSubject.Doctor, action: AUTH_ACTION_ALL },
        ]),
      },
      {
        icon: <WorkIcon />,
        label: 'Đối tượng',
        destination: urlManagePatientTypePage(),
        isAuthorized: authOneOf([
          { subject: AuthSubject.PatientType, action: AUTH_ACTION_ALL },
        ]),
      },
      {
        icon: <MedicalInformationIcon />,
        label: 'Chẩn đoán',
        destination: urlManageDiagnosisPage(),
        isAuthorized: authOneOf([
          { subject: AuthSubject.Diagnosis, action: AUTH_ACTION_ALL },
        ]),
      },
      {
        icon: <VaccinesIcon />,
        label: 'Loại mẫu',
        destination: urlManageSampleTypePage(),
        isAuthorized: authOneOf([
          { subject: AuthSubject.SampleType, action: AUTH_ACTION_ALL },
        ]),
      },
      {
        icon: <WorkspacesIcon />,
        label: 'Nhóm XN',
        destination: urlManageTestCategoryPage(),
        isAuthorized: authOneOf([
          { subject: AuthSubject.TestCategory, action: AUTH_ACTION_ALL },
        ]),
      },
      {
        icon: <BiotechIcon />,
        label: 'Tên XN',
        destination: urlManageTestPage(),
        isAuthorized: authOneOf([
          { subject: AuthSubject.Test, action: AUTH_ACTION_ALL },
        ]),
      },
      {
        icon: <BloodtypeIcon />,
        label: 'Thành phần XN',
        destination: urlManageTestElementPage(),
        isAuthorized: authOneOf([
          { subject: AuthSubject.TestElement, action: AUTH_ACTION_ALL },
        ]),
      },
      {
        icon: <Diversity2Icon />,
        label: 'Bộ xét nghiệm',
        destination: urlManageTestComboPage(),
        isAuthorized: authOneOf([
          { subject: AuthSubject.TestCombo, action: AUTH_ACTION_ALL },
        ]),
      },
      {
        icon: <ListAltIcon />,
        label: 'Form In',
        destination: urlManagePrintFormPage(),
        isAuthorized: authOneOf([
          { subject: AuthSubject.PrintForm, action: AUTH_ACTION_ALL },
        ]),
      },
    ],
  },
]
