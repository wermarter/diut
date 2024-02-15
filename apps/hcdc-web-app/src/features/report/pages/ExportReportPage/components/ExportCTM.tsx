import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { endOfDay, startOfDay } from 'date-fns'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { checkPermissionAnyOf, Permission } from '@diut/hcdc'

import { useReportExportCTMMutation } from 'src/infra/api/report'
import { FormDateTimePicker } from 'src/components/form'
import { ExportDialog } from './ExportDialog'
import { useTypedSelector } from 'src/core'
import { selectUserPermissions } from 'src/infra/auth'

const schema = z.object({
  startDate: z.date({ invalid_type_error: 'Không được để trống' }),
  endDate: z.date({ invalid_type_error: 'Không được để trống' }),
})
const formResolver = zodResolver(schema)
type FormSchema = z.infer<typeof schema>

export function ExportCTM() {
  const userPermissions = useTypedSelector(selectUserPermissions)
  const [openDialog, setOpenDialog] = useState(false)
  const [exportCTM, { isLoading }] = useReportExportCTMMutation()

  const { control, handleSubmit } = useForm<FormSchema>({
    resolver: formResolver,
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
    },
  })

  return (
    <>
      <Button
        variant="outlined"
        fullWidth
        onClick={() => {
          setOpenDialog(true)
        }}
        disabled={
          !checkPermissionAnyOf(userPermissions, [Permission.ExportCTM])
        }
      >
        CTM
      </Button>
      <ExportDialog
        title="Sổ Công thức máu"
        open={openDialog}
        isLoading={isLoading}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleSubmit(async (values) => {
          await exportCTM({
            exportCTMRequestDto: {
              startDate: startOfDay(values.startDate).toISOString(),
              endDate: endOfDay(values.endDate).toISOString(),
            },
          })
        })}
      >
        <Grid container spacing={2}>
          <Grid xs={6}>
            <FormDateTimePicker
              control={control}
              name="startDate"
              dateOnly
              label="Từ ngày"
            />
          </Grid>
          <Grid xs={6}>
            <FormDateTimePicker
              control={control}
              name="endDate"
              dateOnly
              label="Đến ngày"
            />
          </Grid>
        </Grid>
      </ExportDialog>
    </>
  )
}
