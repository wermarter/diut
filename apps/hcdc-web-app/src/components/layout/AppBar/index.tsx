import { BranchType } from '@diut/hcdc'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Lock from '@mui/icons-material/Lock'
import Logout from '@mui/icons-material/Logout'
import {
  FormControl,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  AppBar as MuiAppBar,
  Select,
  Toolbar,
  Typography,
} from '@mui/material'
import * as React from 'react'
import { useNavigation, useRevalidator } from 'react-router-dom'

import { ProgressBar } from 'src/components/ui'
import { ChangePassword, authSlice } from 'src/features/auth'
import { userLogout } from 'src/features/auth/state/actions'
import { authApi } from 'src/infra/api/access-service/auth'
import { useTypedDispatch, useTypedSelector } from 'src/infra/redux'

interface AppBarProps {
  drawerWidth: number
}

export function AppBar({ drawerWidth }: AppBarProps) {
  const dispatch = useTypedDispatch()
  const name = useTypedSelector(authSlice.selectors.selectUserName)
  const branches = useTypedSelector(authSlice.selectors.selectBranches)
  const activeBranchId = useTypedSelector(
    authSlice.selectors.selectActiveBranchId,
  )

  const navigation = useNavigation()
  const revalidator = useRevalidator()

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
    dispatch(authApi.endpoints.authLogout.initiate())
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
      <Toolbar
        variant="dense"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <FormControl
          color="secondary"
          focused
          size="small"
          sx={{ minWidth: '200px' }}
        >
          <Select
            sx={{ bgcolor: 'white' }}
            value={activeBranchId}
            onChange={({ target }) => {
              const branchId = target?.value
              if (branchId) {
                dispatch(authSlice.actions.setActiveBranchId({ branchId }))
              }
            }}
          >
            {branches?.map((branch) => (
              <MenuItem
                key={branch._id}
                value={branch._id}
                dense={branch.type === BranchType.External}
              >
                {branch.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
            {name}
          </Typography>
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
      </Toolbar>
      {(navigation.state !== 'idle' || revalidator.state !== 'idle') && (
        <ProgressBar />
      )}
      <ChangePassword
        open={openChangePassword}
        onClose={() => {
          setOpenChangePassword(false)
        }}
      />
    </MuiAppBar>
  )
}
