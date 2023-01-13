import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { endOfDay, startOfDay } from 'date-fns'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { checkPermissionAnyOf, Permission } from '@diut/common'

import { FormAutocomplete, FormDateTimePicker } from 'src/common/form-elements'
import { ExportDialog } from './ExportDialog'
import { useTypedSelector } from 'src/core'
import { selectUserPermissions } from 'src/modules/auth'
import { useTestSearchQuery } from 'src/api/test'
import { useReportExportTraKqMutation } from 'src/api/report'

const schema = z.object({
  startDate: z.date({ invalid_type_error: 'Không được để trống' }),
  endDate: z.date({ invalid_type_error: 'Không được để trống' }),
  testIds: z.array(z.string()).nonempty('Phải chọn một XN'),
})
const formResolver = zodResolver(schema)
type FormSchema = z.infer<typeof schema>

export function ExportTraKQ() {
  const userPermissions = useTypedSelector(selectUserPermissions)
  const [openDialog, setOpenDialog] = useState(false)
  const [exportTraKQ, { isLoading }] = useReportExportTraKqMutation()

  const { data: testRes, isSuccess } = useTestSearchQuery({
    searchTestRequestDto: {},
  })

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
          !checkPermissionAnyOf(userPermissions, [Permission.ExportTraKQ])
        }
      >
        trả kết quả
      </Button>
      <ExportDialog
        title="Sổ Soi nhuộm"
        open={openDialog}
        isLoading={isLoading}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleSubmit(async (values) => {
          await exportTraKQ({
            exportTraKqRequestDto: {
              startDate: startOfDay(values.startDate).toISOString(),
              endDate: endOfDay(values.endDate).toISOString(),
              testIds: values.testIds,
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
          {isSuccess && (
            <Grid xs={12}>
              <FormAutocomplete
                groupBy={(option) => option?.category?.name ?? ''}
                control={control}
                name="testIds"
                options={testRes.items?.length > 0 ? testRes.items : []}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option._id}
                label="Chọn XN"
              />
            </Grid>
          )}
        </Grid>
      </ExportDialog>
    </>
  )
}
