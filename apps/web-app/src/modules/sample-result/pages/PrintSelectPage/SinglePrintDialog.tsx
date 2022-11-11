import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { SampleResponseDto } from 'src/api/sample'

interface SinglePrintDialogProps {
  sample: SampleResponseDto | null
  onClose: Function
}

export function SinglePrintDialog({ sample, onClose }: SinglePrintDialogProps) {
  const handleClose = (
    event: object,
    reason: 'backdropClick' | 'escapeKeyDown'
  ) => {
    // if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
    //   return
    // }
    onClose()
  }

  return (
    <Dialog open={sample !== null} onClose={handleClose}>
      <DialogTitle>In kết quả: {sample?.sampleId}</DialogTitle>
      <DialogContent>
        <DialogContentText>Hé lô ajinômôtô</DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
