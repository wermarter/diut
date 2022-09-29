import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import fullLogo from 'src/assets/images/full-logo.png'
import { drawerItems } from './drawer-items'

interface AppDrawerProps {
  drawerWidth: number
}

export function AppDrawer({ drawerWidth }: AppDrawerProps) {
  const navigate = useNavigate()
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <img
        src={fullLogo}
        width={`${drawerWidth}px`}
        style={{ padding: '4px', cursor: 'pointer' }}
        onClick={() => {
          navigate('/')
        }}
      />
      <Divider sx={{ my: 1 }} />
      <List
        sx={{
          '&& .Mui-selected, && .Mui-selected:hover': {
            bgcolor: 'primary.main',
            '&, & .MuiListItemIcon-root': {
              color: 'white',
            },
          },
        }}
      >
        {drawerItems.map((item, index) =>
          !item.isDivider ? (
            <ListItem
              key={index}
              disablePadding
              onClick={() => {
                setSelectedIndex(index)
                navigate(item.link)
              }}
            >
              <ListItemButton selected={index === selectedIndex}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ) : (
            <Divider key={index} sx={{ my: 1 }} />
          )
        )}
      </List>
    </Drawer>
  )
}
