import {
  AUTH_ACTION_ALL,
  AuthSubject,
  BranchAction,
  Report,
  ReportAction,
  ReportType,
  SampleAction,
} from '@diut/hcdc'
import AccountBoxIcon from '@mui/icons-material/AccountBoxOutlined'
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal'
import ApartmentIcon from '@mui/icons-material/Apartment'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import BiotechIcon from '@mui/icons-material/BiotechOutlined'
import BloodtypeIcon from '@mui/icons-material/BloodtypeOutlined'
import Diversity2Icon from '@mui/icons-material/Diversity2'
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import HomeIcon from '@mui/icons-material/HomeOutlined'
import ListAltIcon from '@mui/icons-material/ListAlt'
import ManageAccountsIcon from '@mui/icons-material/ManageAccountsOutlined'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import PrintIcon from '@mui/icons-material/Print'
import RuleIcon from '@mui/icons-material/Rule'
import VaccinesIcon from '@mui/icons-material/VaccinesOutlined'
import WorkIcon from '@mui/icons-material/WorkOutline'
import WorkspacesIcon from '@mui/icons-material/WorkspacesOutlined'
import { urlManageBranchPage } from 'src/features/branch'
import { urlManageDiagnosisPage } from 'src/features/diagnosis'
import { urlManageDoctorPage } from 'src/features/doctor'
import { urlPatientSearchPage } from 'src/features/patient'
import { urlManagePatientTypePage } from 'src/features/patient-type'
import { urlManagePrintFormPage } from 'src/features/print-form'
import { urlReportExportPage, urlSoNhanMauPage } from 'src/features/report'
import { urlInfoConfirmPage, urlInfoInputPage } from 'src/features/sample-info'
import {
  urlPrintSelectPage,
  urlResultSelectPage,
} from 'src/features/sample-result'
import { urlManageSampleTypePage } from 'src/features/sample-type'
import { urlManageTestPage } from 'src/features/test'
import { urlManageTestCategoryPage } from 'src/features/test-category'
import { urlManageTestComboPage } from 'src/features/test-combo'
import { urlManageTestElementPage } from 'src/features/test-element'
import { urlManageUserPage } from 'src/features/user'
import { DrawerItemGroup, authOneOf } from './utils'

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
            subject: AuthSubject.Report,
            action: ReportAction.View,
            filterObj: { type: ReportType.SoNhanMau } as Report,
          },
          {
            subject: AuthSubject.Report,
            action: ReportAction.Export,
            filterObj: { type: ReportType.SoNhanMau } as Report,
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
        destination: urlReportExportPage(),
        isAuthorized: authOneOf([
          {
            subject: AuthSubject.Report,
            action: ReportAction.Export,
            filterObj: { type: ReportType.SinhHoa } as Report,
          },
          {
            subject: AuthSubject.Report,
            action: ReportAction.Export,
            filterObj: { type: ReportType.SoiNhuom } as Report,
          },
          {
            subject: AuthSubject.Report,
            action: ReportAction.Export,
            filterObj: { type: ReportType.TDD } as Report,
          },
          {
            subject: AuthSubject.Report,
            action: ReportAction.Export,
            filterObj: { type: ReportType.Urine } as Report,
          },
          {
            subject: AuthSubject.Report,
            action: ReportAction.Export,
            filterObj: { type: ReportType.HCG } as Report,
          },
          {
            subject: AuthSubject.Report,
            action: ReportAction.Export,
            filterObj: { type: ReportType.Pap } as Report,
          },
          {
            subject: AuthSubject.Report,
            action: ReportAction.Export,
            filterObj: { type: ReportType.Thinprep } as Report,
          },
          {
            subject: AuthSubject.Report,
            action: ReportAction.Export,
            filterObj: { type: ReportType.HIV } as Report,
          },
          {
            subject: AuthSubject.Report,
            action: ReportAction.Export,
            filterObj: { type: ReportType.CTM } as Report,
          },
          {
            subject: AuthSubject.Report,
            action: ReportAction.Export,
            filterObj: { type: ReportType.TraKQ } as Report,
          },
          {
            subject: AuthSubject.Report,
            action: ReportAction.Export,
            filterObj: { type: ReportType.GiaoNhan } as Report,
          },
        ]),
      },
    ],
  },
  {
    title: 'Quản lý hệ thống',
    children: [
      {
        icon: <ApartmentIcon />,
        label: 'Chi nhánh',
        destination: urlManageBranchPage(),
        isAuthorized: authOneOf([
          { subject: AuthSubject.Branch, action: BranchAction.Update },
        ]),
      },
      {
        icon: <ManageAccountsIcon />,
        label: 'Người dùng',
        destination: urlManageUserPage(),
        isAuthorized: authOneOf(
          [{ subject: AuthSubject.User, action: AUTH_ACTION_ALL }],
          'branchIds',
        ),
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
