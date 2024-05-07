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

import { useReportExportGiaoNhanMutation } from 'src/infra/api/access-service/report'
import { FormAutocomplete, FormDateTimePicker } from 'src/components/form'
import { ExportDialog } from '../ExportDialog'
import { useTypedSelector } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'
import { BranchResponseDto } from 'src/infra/api/access-service/branch'
import { TestComboResponseDto } from 'src/infra/api/access-service/test-combo'
import { TestResponseDto } from 'src/infra/api/access-service/test'

const schema = z.object({
  fromDate: z.date({ invalid_type_error: 'Không được để trống' }),
  toDate: z.date({ invalid_type_error: 'Không được để trống' }),
  originIds: z.array(z.string()),
  testIds: z.array(z.string()),
  testComboIds: z.array(z.string()),
})
const formResolver = zodResolver(schema)
type FormSchema = z.infer<typeof schema>

export type ExportGiaoNhanButtonProps = {
  origins: BranchResponseDto[]
  testCombos: TestComboResponseDto[]
  tests: TestResponseDto[]
}

export function ExportGiaoNhanButton(props: ExportGiaoNhanButtonProps) {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const userPermissions = useTypedSelector(
    authSlice.selectors.selectUserPermissions,
  )
  const userAbility = useMemo(() => {
    return createAbility(userPermissions)
  }, [userPermissions])

  const [openDialog, setOpenDialog] = useState(false)
  const [exportGiaoNhan, { isLoading }] = useReportExportGiaoNhanMutation()

  const { control, handleSubmit } = useForm<FormSchema>({
    resolver: formResolver,
    defaultValues: {
      fromDate: new Date(),
      toDate: new Date(),
      originIds: [],
      testIds: [],
      testComboIds: [],
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
            { type: ReportType.TraKQ, branchId },
          )
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
          await exportGiaoNhan({
            branchId,
            fromDate: startOfDay(values.fromDate).toISOString(),
            toDate: endOfDay(values.toDate).toISOString(),
            originIds: values.originIds,
            testComboIds: values.testComboIds,
            testIds: values.testIds,
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
              multiple
              control={control}
              name="originIds"
              options={props.origins ?? []}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
              label="Lọc đơn vị"
            />
          </Grid>
          <Grid xs={12}>
            <FormAutocomplete
              multiple
              groupBy={(option) => option.testCategory?.name!}
              control={control}
              name="testIds"
              options={props.tests}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
              label="Chọn XN"
            />
          </Grid>
          <Grid xs={12}>
            <FormAutocomplete
              multiple
              control={control}
              name="testComboIds"
              options={props.testCombos}
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
