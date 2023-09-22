import {
  PropsWithChildren,
  useCallback,
  forwardRef,
  ReactElement,
  Ref,
} from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { TransitionProps } from '@mui/material/transitions'
import { Slide } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { LoadingButton } from '@mui/lab'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />
})

interface ExportDialogProps extends PropsWithChildren {
  open: boolean
  onClose: Function
  onConfirm: Function
  title?: string
  isLoading?: boolean
}

export function ExportDialog({
  open,
  onClose,
  onConfirm,
  title = 'Xuất báo cáo',
  isLoading = false,
  children,
}: ExportDialogProps) {
  const handleClose = useCallback(
    (event: object, reason: 'backdropClick' | 'escapeKeyDown') => {
      if (isLoading === true) {
        return
      }
      onClose()
    },
    [isLoading],
  )

  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
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
        <LoadingButton
          color="primary"
          size="small"
          variant="contained"
          onClick={handleConfirm}
          endIcon={<FileDownloadIcon />}
          loading={isLoading}
        >
          Download
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
