import {
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

import { useDrawerItems } from './hooks'

export function AppDrawer({ drawerWidth }: { drawerWidth: number }) {
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
          <Fragment key={groupIndex}>
            {groupIndex > 0 && <Divider />}
            <ListSubheader disableSticky component="div" inset>
              {group.title}
            </ListSubheader>
            {group.children.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  href={item.destination.toString()}
                  disableRipple
                  selected={
                    matchPath(item.destination as string, pathname)?.pattern
                      .path === item.destination
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(item.destination)
                  }}
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
