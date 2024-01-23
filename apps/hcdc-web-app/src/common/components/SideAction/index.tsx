import {
  Box,
  Drawer,
  Typography,
  AppBar,
  Toolbar,
  DrawerProps,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { PropsWithChildren, useCallback } from 'react'

import { drawerWidth } from 'src/common/layout/MainLayout'

interface SideActionProps extends PropsWithChildren {
  title: string
  open: boolean
  onClose: Function
  fullWidth?: boolean
  disableClickOutside?: boolean
  anchor?: DrawerProps['anchor']
}

export function SideAction({
  title,
  open,
  onClose,
  fullWidth = false,
  disableClickOutside = false,
  children,
}: SideActionProps) {
  const handleClose = useCallback(
    (event: object, reason: 'backdropClick' | 'escapeKeyDown') => {
      if (disableClickOutside && reason && reason === 'backdropClick') {
        return
      }
      onClose()
    },
    [disableClickOutside],
  )

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      ModalProps={{ disableEscapeKeyDown: disableClickOutside }}
    >
      <Box
        sx={{
          height: 'calc(100vh - 48px)',
          display: 'flex',
          flexDirection: 'column',
          minWidth: '30vw',
          maxWidth: `calc(100vw - ${drawerWidth}px)`,
          width: fullWidth ? `calc(100vw - ${drawerWidth}px)` : undefined,
        }}
      >
        <AppBar position="sticky" elevation={0}>
          <Toolbar
            variant="dense"
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography variant="h6">{title}</Typography>
            <IconButton
              aria-label="close"
              color="inherit"
              disabled={disableClickOutside}
              onClick={() => {
                onClose()
              }}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ m: 2, flexGrow: 1 }}>{children}</Box>
      </Box>
    </Drawer>
  )
}
