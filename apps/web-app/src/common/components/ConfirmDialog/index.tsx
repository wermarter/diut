import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface ConfirmDialogProps {
  open: boolean
  onClose: Function
  onConfirm: Function
  title?: string
  content?: string
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Bạn có chắc chắn không?',
  content = '',
}: ConfirmDialogProps) {
  const handleClose = (
    event: object,
    reason: 'backdropClick' | 'escapeKeyDown'
  ) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      return
    }
    onClose()
  }

  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
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
