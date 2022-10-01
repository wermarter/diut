import React from 'react'
import { Inbox as InboxIcon, Mail as MailIcon } from '@mui/icons-material'

interface DrawerDivider {
  isDivider: true

  nextSectionTitle?: string
}

interface DrawerItem {
  isDivider?: false

  icon: React.ReactElement
  text: string
  link: string
}

type DrawerItemType = DrawerItem | DrawerDivider

export const drawerItems: DrawerItemType[] = [
  {
    icon: <InboxIcon />,
    text: 'Item 1',
    link: '1',
  },
  {
    icon: <MailIcon />,
    text: 'Item 2',
    link: '2',
  },
  {
    icon: <InboxIcon />,
    text: 'Item 3',
    link: '3',
  },
  {
    isDivider: true,
  },
  {
    icon: <MailIcon />,
    text: 'Last item',
    link: '',
  },
]
