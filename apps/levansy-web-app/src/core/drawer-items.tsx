import { ReactElement } from 'react'
import { To } from 'react-router-dom'
import { Permission } from '@diut/levansy-common'
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

export interface MenuItem {
  icon: ReactElement
  label: string
  destination: To
  permissionAnyOf?: Permission[]
  permissionAllOf?: Permission[]
}

export interface DrawerItem {
  title: string
  permissionAnyOf?: Permission[]
  permissionAllOf?: Permission[]
  children: MenuItem[]
}

export const drawerItems: DrawerItem[] = [
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
        permissionAnyOf: [Permission.ManageInfo],
      },
      {
        icon: <FaceRetouchingNaturalIcon />,
        label: 'Xác nhận TT',
        destination: 'info/confirm',
        permissionAnyOf: [Permission.ManageInfo],
      },
      {
        icon: <AppRegistrationIcon />,
        label: 'Nhập KQ',
        destination: 'result',
        permissionAnyOf: [Permission.ManageResult],
      },
      {
        icon: <PrintIcon />,
        label: 'In KQ',
        destination: 'result/print',
        permissionAnyOf: [Permission.PrintResult, Permission.ManageInfo],
      },
      {
        icon: <RuleIcon />,
        label: 'Sổ nhận mẫu',
        destination: 'report/test',
        permissionAnyOf: [Permission.ViewTestReport],
      },
      {
        icon: <PersonSearchIcon />,
        label: 'Tìm kiếm',
        destination: 'patient/search',
        permissionAnyOf: [Permission.ManageInfo],
      },
      {
        icon: <FileDownloadIcon />,
        label: 'Xuất báo cáo',
        destination: 'report/export',
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
          Permission.ExportGiaoNhanMau,
        ],
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
        permissionAnyOf: [Permission.Admin],
      },
      {
        icon: <AccountBoxIcon />,
        label: 'Bác sĩ',
        destination: 'manage/doctors',
        permissionAnyOf: [Permission.Admin],
      },
      {
        icon: <WorkIcon />,
        label: 'Đối tượng',
        destination: 'manage/patient-types',
        permissionAnyOf: [Permission.Admin],
      },
      {
        icon: <MedicalInformationIcon />,
        label: 'Chẩn đoán',
        destination: 'manage/indications',
        permissionAnyOf: [Permission.Admin],
      },
      {
        icon: <CoronavirusIcon />,
        label: 'Sinh phẩm',
        destination: 'manage/bio-products',
        permissionAnyOf: [Permission.Admin],
      },
      {
        icon: <VaccinesIcon />,
        label: 'Loại mẫu',
        destination: 'manage/sample-types',
        permissionAnyOf: [Permission.Admin],
      },
      {
        icon: <WorkspacesIcon />,
        label: 'Nhóm XN',
        destination: 'manage/test-categories',
        permissionAnyOf: [Permission.Admin],
      },
      {
        icon: <BiotechIcon />,
        label: 'Tên XN',
        destination: 'manage/tests',
        permissionAnyOf: [Permission.Admin],
      },
      {
        icon: <BloodtypeIcon />,
        label: 'Thành phần XN',
        destination: 'manage/test-elements',
        permissionAnyOf: [Permission.Admin],
      },
      {
        icon: <Diversity2Icon />,
        label: 'Bộ xét nghiệm',
        destination: 'manage/test-combos',
        permissionAnyOf: [Permission.Admin],
      },
      {
        icon: <ListAltIcon />,
        label: 'Form In',
        destination: 'manage/print-forms',
        permissionAnyOf: [Permission.Admin],
      },
    ],
  },
]
