import { LoadingButton } from '@mui/lab'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { TransitionProps } from '@mui/material/transitions'
import { addDays, isWeekend, nextMonday } from 'date-fns'
import { ReactElement, Ref, forwardRef } from 'react'
import { useForm } from 'react-hook-form'
import { FormContainer, FormDateTimePicker } from 'src/components/form'
import { useLazySamplePrintReminderQuery } from 'src/infra/api/access-service/sample'
import { PrintBarcode, PrintBarcodeProps } from './components'

const expectedReminderDate = addDays(new Date(), 10)
const DEFAULT_REMINDER_DATE = isWeekend(expectedReminderDate)
  ? nextMonday(expectedReminderDate)
  : expectedReminderDate

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

interface FormData {
  reminderDate: Date
}

export function BarcodeModal({
  open,
  onClose,
  ...printProps
}: BarcodeModalProps) {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      reminderDate: DEFAULT_REMINDER_DATE,
    },
  })

  const [printReminder, { isFetching }] = useLazySamplePrintReminderQuery()

  const handlePrintReminder = async (data: FormData) => {
    await printReminder({
      id: printProps.sampleId,
      timestamp: data.reminderDate.getTime(),
    }).unwrap()
  }

  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      onClose={() => onClose()}
    >
      <DialogTitle>In CODE: {printProps.sampleId}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid xs={4}>
            <PrintBarcode {...printProps} quantity={3}>
              <Button variant="outlined">3 CODE</Button>
            </PrintBarcode>
          </Grid>
          <Grid xs={4}>
            <PrintBarcode {...printProps} quantity={6}>
              <Button variant="outlined">6 CODE</Button>
            </PrintBarcode>
          </Grid>
          <Grid xs={4}>
            <PrintBarcode {...printProps} quantity={9}>
              <Button variant="outlined">9 CODE</Button>
            </PrintBarcode>
          </Grid>
        </Grid>
        <hr />
        <FormContainer
          onSubmit={handleSubmit(handlePrintReminder)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid xs={8}>
              <FormDateTimePicker
                control={control}
                name="reminderDate"
                dateOnly
                label="Ngày hẹn"
              />
            </Grid>
            <Grid xs={4}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isFetching}
                sx={{ height: '100%' }}
                fullWidth
              >
                In
              </LoadingButton>
            </Grid>
          </Grid>
        </FormContainer>
      </DialogContent>
    </Dialog>
  )
}
