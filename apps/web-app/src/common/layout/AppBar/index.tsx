import * as React from 'react'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Lock from '@mui/icons-material/Lock'
import Logout from '@mui/icons-material/Logout'
import {
  AppBar as MuiAppBar,
  IconButton,
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
import { ProgressBar } from 'src/common/components/ProgressBar'
import { ChangePassword } from 'src/common/components/ChangePassword'

interface AppBarProps {
  drawerWidth: number
}

export function AppBar({ drawerWidth }: AppBarProps) {
  const dispatch = useTypedDispatch()
  const name = useTypedSelector(selectUserName)
  const navigation = useNavigation()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [openChangePassword, setOpenChangePassword] = React.useState(false)

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

  const handleChangePassword = () => {
    handleClose()
    setOpenChangePassword(true)
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
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
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
            <MenuItem onClick={handleChangePassword}>
              <ListItemIcon>
                <Lock />
              </ListItemIcon>
              <ListItemText>Đổi mật khẩu</ListItemText>
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
      {navigation.state !== 'idle' && <ProgressBar />}
      <ChangePassword
        open={openChangePassword}
        onClose={() => {
          setOpenChangePassword(false)
        }}
      />
    </MuiAppBar>
  )
}
