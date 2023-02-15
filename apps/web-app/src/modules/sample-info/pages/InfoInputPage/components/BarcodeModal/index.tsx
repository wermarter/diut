import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Button,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { ReactElement, Ref, forwardRef } from 'react'
import Grid from '@mui/material/Unstable_Grid2'

import { PrintBarcode } from 'src/modules/sample-info/components/PrintBarcode'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>
  },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />
})

export interface BarcodeModalProps {
  open: boolean
  onClose: Function
}

export function BarcodeModal({ open, onClose }: BarcodeModalProps) {
  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      onClose={() => onClose()}
    >
      <DialogTitle>In CODE: jksdfhs</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid xs={4}>
            <PrintBarcode>
              <Button>3 CODE</Button>
            </PrintBarcode>
          </Grid>
          <Grid xs={4}>
            <Button>6 CODE</Button>
          </Grid>
          <Grid xs={4}>
            <Button>9 CODE</Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
