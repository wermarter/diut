import { Box, Toolbar } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { AppBar } from '../AppBar'
import { AppDrawer } from '../AppDrawer'

const drawerWidth = 240

export function MainLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar drawerWidth={drawerWidth} />
      <AppDrawer drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}
