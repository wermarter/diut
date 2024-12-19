import { Box, Toolbar } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppBar } from '../AppBar'
import { AppDrawer } from '../AppDrawer'

export const drawerWidth = 220

export function MainLayout() {
  return (
    <>
      <AppBar drawerWidth={drawerWidth} />
      <Box
        sx={{
          ml: `${drawerWidth}px`,
          // minWidth: '800px',
          height: 'calc(100vh - 48px)',
        }}
      >
        <AppDrawer drawerWidth={drawerWidth} />
        <Box
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          <Toolbar variant="dense" />
          <Box
            component="main"
            sx={{
              width: '100%',
              height: '100%',
            }}
          >
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
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  )
}
