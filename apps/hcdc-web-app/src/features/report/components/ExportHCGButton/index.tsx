import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { endOfDay, startOfDay } from 'date-fns'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  AuthSubject,
  ReportAction,
  ReportType,
  checkPermission,
  createAbility,
} from '@diut/hcdc'

import { useReportExportHcgMutation } from 'src/infra/api/access-service/report'
import { FormAutocomplete, FormDateTimePicker } from 'src/components/form'
import { ExportDialog } from '../ExportDialog'
import { useTypedSelector } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'
import { BranchResponseDto } from 'src/infra/api/access-service/branch'

const schema = z.object({
  fromDate: z.date({ invalid_type_error: 'Không được để trống' }),
  toDate: z.date({ invalid_type_error: 'Không được để trống' }),
  originIds: z.array(z.string()),
})
const formResolver = zodResolver(schema)
type FormSchema = z.infer<typeof schema>

export type ExportHCGButtonProps = {
  origins: BranchResponseDto[]
}

export function ExportHCGButton(props: ExportHCGButtonProps) {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const userPermissions = useTypedSelector(
    authSlice.selectors.selectUserPermissions,
  )
  const userAbility = useMemo(() => {
    return createAbility(userPermissions)
  }, [userPermissions])

  const [openDialog, setOpenDialog] = useState(false)
  const [exportHCG, { isLoading }] = useReportExportHcgMutation()

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
            { type: ReportType.HCG },
          )
        }
      >
        hCG URINE
      </Button>
      <ExportDialog
        title="Sổ hCG URINE"
        open={openDialog}
        isLoading={isLoading}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleSubmit(async (values) => {
          await exportHCG({
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
