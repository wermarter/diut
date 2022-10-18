import { Box, Toolbar } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AppBar } from '../AppBar'
import { AppDrawer } from '../AppDrawer'

export const drawerWidth = 240

export function MainLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar drawerWidth={drawerWidth} />
      <AppDrawer drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', px: 3, py: 1 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />
    </Box>
  )
}
