import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { endOfDay, startOfDay } from 'date-fns'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { checkPermissionAnyOf, Permission } from '@diut/common'
import { useLoaderData } from 'react-router-dom'

import { FormAutocomplete, FormDateTimePicker } from 'src/common/form-elements'
import { ExportDialog } from './ExportDialog'
import { useTypedSelector } from 'src/core'
import { selectUserPermissions } from 'src/modules/auth'
import { useReportExportGiaoNhanMauMutation } from 'src/api/report'
import { exportReportPageLoader } from '../loader'

const schema = z.object({
  startDate: z.date({ invalid_type_error: 'Không được để trống' }),
  endDate: z.date({ invalid_type_error: 'Không được để trống' }),
  testIds: z.array(z.string()),
  testComboIds: z.array(z.string()),
})
const formResolver = zodResolver(schema)
type FormSchema = z.infer<typeof schema>

export function ExportGiaoNhanMau() {
  const { tests, testCombos } = useLoaderData() as Awaited<
    ReturnType<typeof exportReportPageLoader>
  >

  const userPermissions = useTypedSelector(selectUserPermissions)
  const [openDialog, setOpenDialog] = useState(false)
  const [exportGiaoNhanMau, { isLoading }] =
    useReportExportGiaoNhanMauMutation()

  const { control, handleSubmit } = useForm<FormSchema>({
    resolver: formResolver,
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
      testIds: [],
      testComboIds: [],
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
          !checkPermissionAnyOf(userPermissions, [Permission.ExportGiaoNhanMau])
        }
      >
        DS giao nhận mẫu
      </Button>
      <ExportDialog
        title="Danh sách Giao nhận mẫu"
        open={openDialog}
        isLoading={isLoading}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleSubmit(async (values) => {
          await exportGiaoNhanMau({
            exportGiaoNhanRequestDto: {
              startDate: startOfDay(values.startDate).toISOString(),
              endDate: endOfDay(values.endDate).toISOString(),
              testIds: values.testIds,
              testComboIds: values.testComboIds,
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
          <Grid xs={12}>
            <FormAutocomplete
              groupBy={(option) => option?.category?.name ?? ''}
              control={control}
              name="testIds"
              options={tests}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
              label="Chọn XN"
            />
          </Grid>
          <Grid xs={12}>
            <FormAutocomplete
              control={control}
              name="testComboIds"
              options={testCombos}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
              label="Chọn bộ XN"
            />
          </Grid>
        </Grid>
      </ExportDialog>
    </>
  )
}
