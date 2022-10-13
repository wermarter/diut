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
import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { fullLogo } from 'src/assets/images'
import { MenuItem } from 'src/core'
import { useDrawerItems } from './hooks'

interface AppDrawerProps {
  drawerWidth: number
}

export function AppDrawer({ drawerWidth }: AppDrawerProps) {
  const navigate = useNavigate()
  const drawerItems = useDrawerItems()
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

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
          overflowX: 'hidden',
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
          overflowY: 'scroll',
        }}
      >
        {drawerItems.map((group, index) => (
          <Fragment key={group.title}>
            {index > 0 && <Divider sx={{ my: 1 }} />}
            <ListSubheader disableSticky component="div" inset>
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
                  disableRipple
                  selected={selectedItem?.label === item.label}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </Fragment>
        ))}
      </List>
    </Drawer>
  )
}
