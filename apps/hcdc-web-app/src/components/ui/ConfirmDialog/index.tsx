import { Slide } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { TransitionProps } from '@mui/material/transitions'
import { PropsWithChildren, forwardRef } from 'react'

export const DialogTransition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface ConfirmDialogProps extends PropsWithChildren {
  open: boolean
  onClose: Function
  onConfirm: Function
  title?: string
  contentText?: string
  maxWidth?: DialogProps['maxWidth']
  fullWidth?: boolean
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Bạn có chắc chắn không?',
  contentText = '',
  maxWidth,
  fullWidth,
  children,
}: ConfirmDialogProps) {
  const handleClose = (
    event: object,
    reason: 'backdropClick' | 'escapeKeyDown',
  ) => {
    if (reason === 'backdropClick') {
      return
    }
    onClose()
  }

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Dialog
      open={open}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      onClose={handleClose}
      TransitionComponent={DialogTransition}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers={children !== undefined}>
        {contentText.length > 0 && (
          <DialogContentText mb={2}>{contentText}</DialogContentText>
        )}
        {children}
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          size="small"
          autoFocus
          onClick={() => {
            onClose()
          }}
        >
          Bỏ qua
        </Button>
        <Button
          color="primary"
          size="small"
          variant="contained"
          onClick={handleConfirm}
        >
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  )
}
