import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { fullLogo } from 'src/assets/images'
import { MenuItem } from 'src/core'
import { useDrawerItems } from './hooks'

interface AppDrawerProps {
  drawerWidth: number
}

export function AppDrawer({ drawerWidth }: AppDrawerProps) {
  const navigate = useNavigate()
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const drawerItems = useDrawerItems()

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
      PaperProps={{
        sx: {
          borderColor: 'primary.main',
        },
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          backgroundColor: 'background.paper',
          zIndex: 'appBar',
          top: 0,
          left: 0,
        }}
      >
        <img
          src={fullLogo}
          width={`${drawerWidth}px`}
          style={{
            padding: '4px',
            cursor: 'pointer',
          }}
          onClick={() => {
            navigate('/')
          }}
        />
        <Divider sx={{ my: 1, borderColor: 'primary.main' }} />
      </Box>
      <List
        sx={{
          '&& .Mui-selected, && .Mui-selected:hover': {
            bgcolor: 'primary.main',
            '&, & .MuiListItemIcon-root': {
              color: 'white',
            },
          },
          'overflow-y': 'scroll',
        }}
      >
        {drawerItems.map((group, index) => (
          <>
            {index > 0 && <Divider sx={{ my: 1 }} />}
            <ListSubheader component="div" inset>
              {group.title}
            </ListSubheader>
            {group.children.map((item) => (
              <ListItem
                key={item.label}
                disablePadding
                onClick={() => {
                  setSelectedItem(item)
                  navigate(item.destination)
                }}
              >
                <ListItemButton
                  selected={selectedItem?.destination === item.destination}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </>
        ))}
      </List>
    </Drawer>
  )
}
