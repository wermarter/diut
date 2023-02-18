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
import { Fragment } from 'react'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'

import { fullLogo } from 'src/assets/images'
import { useDrawerItems } from './hooks'

interface AppDrawerProps {
  drawerWidth: number
}

export function AppDrawer({ drawerWidth }: AppDrawerProps) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
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
        <Divider sx={{ mt: 1, borderColor: 'primary.main' }} />
      </Box>
      <List
        sx={{
          '&& .Mui-selected, && .Mui-selected:hover': {
            bgcolor: 'primary.main',
            '&, & .MuiListItemIcon-root': {
              color: 'white',
            },
          },
          p: 0,
          overflowY: 'scroll',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {drawerItems.map((group, groupIndex) => (
          <Fragment key={group.title}>
            {groupIndex > 0 && <Divider sx={{ my: 1 }} />}
            <ListSubheader disableSticky component="div" inset>
              {group.title}
            </ListSubheader>
            {group.children.map((item) => (
              <ListItem
                key={item.label}
                disablePadding
                onClick={() => {
                  navigate(item.destination)
                }}
              >
                <ListItemButton
                  disableRipple
                  selected={
                    matchPath(item.destination as string, pathname)?.pattern
                      .path === item.destination
                  }
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
