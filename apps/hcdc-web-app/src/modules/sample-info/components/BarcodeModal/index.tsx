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

import {
  PrintBarcode,
  PrintBarcodeProps,
} from 'src/modules/sample-info/components/PrintBarcode'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />
})

export interface BarcodeModalProps extends PrintBarcodeProps {
  open: boolean
  onClose: Function
}

export function BarcodeModal({
  open,
  onClose,
  ...printProps
}: BarcodeModalProps) {
  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      onClose={() => onClose()}
    >
      <DialogTitle>In CODE: {printProps.sampleId}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid xs={4}>
            <PrintBarcode {...printProps} quantity={3}>
              <Button>3 CODE</Button>
            </PrintBarcode>
          </Grid>
          <Grid xs={4}>
            <PrintBarcode {...printProps} quantity={6}>
              <Button>6 CODE</Button>
            </PrintBarcode>
          </Grid>
          <Grid xs={4}>
            <PrintBarcode {...printProps} quantity={9}>
              <Button>9 CODE</Button>
            </PrintBarcode>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
