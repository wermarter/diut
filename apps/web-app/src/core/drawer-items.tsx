import { ReactElement } from 'react'
import { To } from 'react-router-dom'
import { Permission } from '@diut/common'
import AccountBoxIcon from '@mui/icons-material/AccountBoxOutlined'
import HomeIcon from '@mui/icons-material/HomeOutlined'
import VaccinesIcon from '@mui/icons-material/VaccinesOutlined'
import BiotechIcon from '@mui/icons-material/BiotechOutlined'
import WorkspacesIcon from '@mui/icons-material/WorkspacesOutlined'
import WorkIcon from '@mui/icons-material/WorkOutline'
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal'
import ManageAccountsIcon from '@mui/icons-material/ManageAccountsOutlined'
import BloodtypeIcon from '@mui/icons-material/BloodtypeOutlined'
import GradingIcon from '@mui/icons-material/Grading'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'
import CoronavirusIcon from '@mui/icons-material/Coronavirus'
import BubbleChartIcon from '@mui/icons-material/BubbleChart'
import Diversity2Icon from '@mui/icons-material/Diversity2'

export interface MenuItem {
  icon: ReactElement
  label: string
  destination: To
  permission?: Permission
}

export interface DrawerItem {
  title: string
  permission?: Permission
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
    ],
  },
  {
    title: 'Quản lý hệ thống',
    children: [
      {
        icon: <ManageAccountsIcon />,
        label: 'Người dùng',
        destination: 'users',
        permission: Permission.ManageCore,
      },
      {
        icon: <AccountBoxIcon />,
        label: 'Bác sĩ',
        destination: 'doctors',
        permission: Permission.ManageCore,
      },
      {
        icon: <WorkIcon />,
        label: 'Đối tượng',
        destination: 'patient-types',
        permission: Permission.ManageCore,
      },
      {
        icon: <MedicalInformationIcon />,
        label: 'Chỉ định',
        destination: 'indications',
        permission: Permission.ManageCore,
      },
      {
        icon: <CoronavirusIcon />,
        label: 'Sinh phẩm',
        destination: 'bio-products',
        permission: Permission.ManageCore,
      },
      {
        icon: <BubbleChartIcon />,
        label: 'Loại mẫu',
        destination: 'sample-types',
        permission: Permission.ManageCore,
      },
      {
        icon: <WorkspacesIcon />,
        label: 'Nhóm XN',
        destination: 'test-categories',
        permission: Permission.ManageCore,
      },
      {
        icon: <BiotechIcon />,
        label: 'Tên xét nghiệm',
        destination: 'tests',
        permission: Permission.ManageCore,
      },
      {
        icon: <BloodtypeIcon />,
        label: 'Thành phần XN',
        destination: 'test-elements',
        permission: Permission.ManageCore,
      },
      {
        icon: <Diversity2Icon />,
        label: 'Bộ Test',
        destination: 'test-combos',
        permission: Permission.ManageCore,
      },
    ],
  },
  {
    title: 'Thông tin',
    children: [
      {
        icon: <AirlineSeatReclineNormalIcon />,
        label: 'Bệnh nhân',
        destination: 'patients',
        permission: Permission.ManagePatient,
      },
      {
        icon: <VaccinesIcon />,
        label: 'Mẫu XN',
        destination: 'samples',
        permission: Permission.ManageSample,
      },
      {
        icon: <GradingIcon />,
        label: 'Kết quả XN',
        destination: 'test-results',
        permission: Permission.ManageTestResult,
      },
    ],
  },
]
