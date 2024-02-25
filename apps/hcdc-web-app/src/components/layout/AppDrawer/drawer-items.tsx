import {
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
import CoronavirusIcon from '@mui/icons-material/Coronavirus'
import Diversity2Icon from '@mui/icons-material/Diversity2'
import PrintIcon from '@mui/icons-material/Print'
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import ListAltIcon from '@mui/icons-material/ListAlt'
import RuleIcon from '@mui/icons-material/Rule'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork'

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
      {
        icon: <AirlineSeatReclineNormalIcon />,
        label: 'Nhập TT',
        destination: 'info',
        isAuthorized: authOneOf([
          { subject: AuthSubject.Sample, action: SampleAction.UpdateInfo },
        ]),
      },
      {
        icon: <FaceRetouchingNaturalIcon />,
        label: 'Xác nhận TT',
        destination: 'info/confirm',
        isAuthorized: authOneOf([
          { subject: AuthSubject.Sample, action: SampleAction.UpdateInfo },
        ]),
      },
      {
        icon: <AppRegistrationIcon />,
        label: 'Nhập KQ',
        destination: 'result',
        isAuthorized: authOneOf([
          { subject: AuthSubject.Sample, action: SampleAction.UpdateResult },
        ]),
      },
      {
        icon: <PrintIcon />,
        label: 'In KQ',
        destination: 'result/print',
        isAuthorized: authOneOf([
          { subject: AuthSubject.Sample, action: SampleAction.PrintResult },
        ]),
      },
      {
        icon: <RuleIcon />,
        label: 'Sổ nhận mẫu',
        destination: 'report/test',
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
        destination: 'patient/search',
        isAuthorized: authOneOf([
          {
            subject: AuthSubject.WebApp,
            action: WebAppAction.View,
            filterObj: { page: WebAppPage.TimKiemBenhNhan } as WebApp,
          },
        ]),
      },
      {
        icon: <FileDownloadIcon />,
        label: 'Xuất báo cáo',
        destination: 'report/export',
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
      },
      {
        icon: <MapsHomeWorkIcon />,
        label: 'Đơn vị',
        destination: 'manage/sample-origins',
      },
      {
        icon: <AccountBoxIcon />,
        label: 'Bác sĩ',
        destination: 'manage/doctors',
      },
      {
        icon: <WorkIcon />,
        label: 'Đối tượng',
        destination: 'manage/patient-types',
      },
      {
        icon: <MedicalInformationIcon />,
        label: 'Chẩn đoán',
        destination: 'manage/indications',
      },
      {
        icon: <CoronavirusIcon />,
        label: 'Sinh phẩm',
        destination: 'manage/bio-products',
      },
      {
        icon: <VaccinesIcon />,
        label: 'Loại mẫu',
        destination: 'manage/sample-types',
      },
      {
        icon: <WorkspacesIcon />,
        label: 'Nhóm XN',
        destination: 'manage/test-categories',
      },
      {
        icon: <BiotechIcon />,
        label: 'Tên XN',
        destination: 'manage/tests',
      },
      {
        icon: <BloodtypeIcon />,
        label: 'Thành phần XN',
        destination: 'manage/test-elements',
      },
      {
        icon: <Diversity2Icon />,
        label: 'Bộ xét nghiệm',
        destination: 'manage/test-combos',
      },
      {
        icon: <ListAltIcon />,
        label: 'Form In',
        destination: 'manage/print-forms',
      },
    ],
  },
]
