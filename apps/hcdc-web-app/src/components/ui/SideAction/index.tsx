import CloseIcon from '@mui/icons-material/Close'
import {
  AppBar,
  Box,
  Drawer,
  DrawerProps,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import { PropsWithChildren, useCallback } from 'react'
import { drawerWidth } from 'src/components/layout'

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
          minHeight: '100vh',
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
        <Box sx={{ height: '100%' }}>{children}</Box>
      </Box>
    </Drawer>
  )
}
