import {
  AuthSubject,
  ReportAction,
  ReportType,
  checkPermission,
  createAbility,
} from '@diut/hcdc'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { endOfDay, startOfDay } from 'date-fns'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormAutocomplete, FormDateTimePicker } from 'src/components/form'
import { authSlice } from 'src/features/auth'
import { BranchResponseDto } from 'src/infra/api/access-service/branch'
import { useReportExportUrineMutation } from 'src/infra/api/access-service/report'
import { useTypedSelector } from 'src/infra/redux'
import { z } from 'zod'
import { ExportDialog } from '../ExportDialog'

const schema = z.object({
  fromDate: z.date({ invalid_type_error: 'Không được để trống' }),
  toDate: z.date({ invalid_type_error: 'Không được để trống' }),
  originIds: z.array(z.string()),
})
const formResolver = zodResolver(schema)
type FormSchema = z.infer<typeof schema>

export type ExportUrineButtonProps = {
  origins: BranchResponseDto[]
}

export function ExportUrineButton(props: ExportUrineButtonProps) {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const userPermissions = useTypedSelector(
    authSlice.selectors.selectUserPermissions,
  )
  const userAbility = useMemo(() => {
    return createAbility(userPermissions)
  }, [userPermissions])

  const [openDialog, setOpenDialog] = useState(false)
  const [exportUrine, { isLoading }] = useReportExportUrineMutation()

  const { control, handleSubmit } = useForm<FormSchema>({
    resolver: formResolver,
    defaultValues: {
      fromDate: new Date(),
      toDate: new Date(),
      originIds: [],
    },
  })

  return (
    <>
      <Button
        variant="outlined"
        size="large"
        fullWidth
        onClick={() => {
          setOpenDialog(true)
        }}
        disabled={
          !checkPermission(
            userAbility,
            AuthSubject.Report,
            ReportAction.Export,
            { type: ReportType.Urine, branchId },
          )
        }
      >
        Urine 10TS
      </Button>
      <ExportDialog
        title="Sổ Urine 10 thông số"
        open={openDialog}
        isLoading={isLoading}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleSubmit(async (values) => {
          await exportUrine({
            branchId,
            fromDate: startOfDay(values.fromDate).toISOString(),
            toDate: endOfDay(values.toDate).toISOString(),
            originIds: values.originIds,
          })
        })}
      >
        <Grid container spacing={2}>
          <Grid xs={6}>
            <FormDateTimePicker
              control={control}
              name="fromDate"
              dateOnly
              label="Từ ngày"
            />
          </Grid>
          <Grid xs={6}>
            <FormDateTimePicker
              control={control}
              name="toDate"
              dateOnly
              label="Đến ngày"
            />
          </Grid>
          <Grid xs={12}>
            <FormAutocomplete
              size="medium"
              multiple
              control={control}
              name="originIds"
              options={props.origins ?? []}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
              label="Lọc đơn vị"
            />
          </Grid>
        </Grid>
      </ExportDialog>
    </>
  )
}
