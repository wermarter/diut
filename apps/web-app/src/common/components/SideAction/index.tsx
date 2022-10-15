import {
  Box,
  Drawer,
  Typography,
  AppBar,
  Toolbar,
  DrawerProps,
} from '@mui/material'
import { PropsWithChildren, useCallback } from 'react'

interface SideActionProps extends PropsWithChildren {
  title: string
  open: boolean
  onClose: Function
  disableClickOutside?: boolean
  minWidth?: string
  anchor?: DrawerProps['anchor']
}

export function SideAction({
  title,
  open,
  onClose,
  disableClickOutside = false,
  minWidth = '30vw',
  children,
}: SideActionProps) {
  const handleClose = useCallback(
    (event: object, reason: 'backdropClick' | 'escapeKeyDown') => {
      if (disableClickOutside && reason && reason == 'backdropClick') {
        return
      }
      onClose()
    },
    [disableClickOutside]
  )

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      ModalProps={{ disableEscapeKeyDown: true }}
    >
      <Box sx={{ height: '100%', minWidth }}>
        <AppBar position="sticky" elevation={0}>
          <Toolbar variant="dense">
            <Typography variant="h6">{title}</Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ m: 2 }}>{children}</Box>
      </Box>
    </Drawer>
  )
}
