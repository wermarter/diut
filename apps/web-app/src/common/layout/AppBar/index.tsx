import * as React from 'react'
import { AccountCircle, FolderShared, Logout } from '@mui/icons-material'
import {
  AppBar as MuiAppBar,
  IconButton,
  LinearProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import { useNavigation } from 'react-router-dom'

import { useTypedDispatch, useTypedSelector } from 'src/core'
import { selectUserName, userLogout } from 'src/modules/auth/slice'

interface AppBarProps {
  drawerWidth: number
}

export function AppBar({ drawerWidth }: AppBarProps) {
  const dispatch = useTypedDispatch()
  const name = useTypedSelector(selectUserName)
  const navigation = useNavigation()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleClose()
    dispatch(userLogout())
  }

  return (
    <MuiAppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      elevation={0}
    >
      <Toolbar variant="dense">
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Xin chào, {name}.
        </Typography>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle fontSize="large" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <FolderShared />
              </ListItemIcon>
              <ListItemText>Thông tin</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText>Đăng xuất</ListItemText>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
      {navigation.state !== 'idle' && <LinearProgress color="secondary" />}
    </MuiAppBar>
  )
}
