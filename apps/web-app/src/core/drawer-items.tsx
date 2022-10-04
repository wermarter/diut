import { ReactElement } from 'react'
import { To } from 'react-router-dom'
import { Inbox as InboxIcon, Mail as MailIcon } from '@mui/icons-material'

import { AppPermission } from 'src/common/types'

export interface MenuItem {
  icon: ReactElement
  label: string
  destination: To
  permission?: AppPermission
}

export interface DrawerItem {
  title: string
  permission?: AppPermission
  children: MenuItem[]
}

export const drawerItems: DrawerItem[] = [
  {
    title: '#1',
    children: [
      {
        icon: <InboxIcon />,
        label: 'Item 1',
        destination: '1',
      },
      {
        icon: <MailIcon />,
        permission: AppPermission.Overview,
        label: 'Item 2',
        destination: '2',
      },
      {
        icon: <InboxIcon />,
        label: 'Item 3',
        destination: '3',
      },
    ],
  },
  {
    title: '#2',
    children: [
      {
        icon: <MailIcon />,
        label: 'Last item',
        destination: '',
      },
      {
        icon: <MailIcon />,
        label: 'Last item 1',
        destination: '',
      },
      {
        icon: <MailIcon />,
        label: 'Last item 2',
        destination: '',
      },
      {
        icon: <MailIcon />,
        label: 'Last item 3',
        destination: '',
      },
      {
        icon: <MailIcon />,
        label: 'Last item 4',
        destination: '',
      },
    ],
  },
]
