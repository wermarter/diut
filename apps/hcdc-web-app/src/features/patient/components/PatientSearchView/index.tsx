import { useEffect, useRef, useState } from 'react'
import { Box, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useForm } from 'react-hook-form'

import {
  usePatientDeleteByIdMutation,
  usePatientSearchQuery,
} from 'src/infra/api/access-service/patient'
import { DataTable } from 'src/components/table'
import { FormContainer, FormTextField } from 'src/components/form'
import { usePagination } from 'src/shared/hooks'
import { ConfirmDialog } from 'src/components/ui/ConfirmDialog'
import { useTypedSelector } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'
import { useColumns } from './columns'

interface FormData {
  externalId: string
  patientName: string
}

export type PatientSearchViewProps = {
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  externalId: string | null
  setExternalId: (externalId: string | null) => void
  patientName: string | null
  setPatientName: (patientName: string | null) => void
}

export function PatientSearchView(props: PatientSearchViewProps) {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!

  const { filterObj, setFilterObj } = usePagination({
    offset: props.page,
    limit: props.pageSize,
    sort: { createdAt: -1 },
  })

  useEffect(() => {
    if (branchId) {
      setFilterObj((prev) => ({
        ...prev,
        filter: {
          ...filterObj.filter,
          branchId,
        },
      }))
    }
  }, [branchId])

  const { control, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      externalId: '',
      patientName: '',
    },
  })

  useEffect(() => {
    if (props.externalId?.length! > 0) {
      setValue('externalId', props.externalId!)
    }
    if (props.patientName?.length! > 0) {
      setValue('patientName', props.patientName!)
    }

    setFilterObj((obj) => ({
      ...obj,
      filter: {
        ...obj.filter,
        externalId:
          props.externalId?.length! > 0 ? props.externalId : undefined,
        name:
          props.patientName?.length! > 0
            ? { $regex: '^' + props.patientName, $options: 'i' }
            : undefined,
      },
    }))
  }, [props.externalId, props.patientName])

  const isFirstRun = useRef(true)
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
  }, [])
  const { data, isFetching } = usePatientSearchQuery(filterObj, {
    skip: isFirstRun.current,
  })
  const [deletePatient, { isLoading: isDeleting }] =
    usePatientDeleteByIdMutation()

  const handleSubmitFilter = ({ externalId, patientName }: FormData) => {
    props.setExternalId(externalId.length === 0 ? null : externalId)
    props.setPatientName(patientName.length === 0 ? null : patientName)
  }

  const [openDeleteItem, setOpenDeleteItem] = useState<string | null>(null)

  const handleDeleteClick = (patientId: string) => {
    if (patientId != undefined) {
      setOpenDeleteItem(patientId)
    }
  }

  const handleDeletePatient = async (patientId: string) => {
    await deletePatient(patientId)
  }

  const columns = useColumns(handleDeleteClick)

  return (
    <Box
      sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Paper sx={{ p: 2, mb: 2 }} elevation={4}>
        <FormContainer onSubmit={handleSubmit(handleSubmitFilter)}>
          <Grid container spacing={2}>
            <Grid xs={2}>
              <FormTextField
                fullWidth
                control={control}
                name="externalId"
                label="ID Phòng khám"
                autoComplete="off"
                disabled={watch('patientName').length > 0}
              />
            </Grid>
            <Grid xs={3}>
              <FormTextField
                fullWidth
                control={control}
                name="patientName"
                label="Họ tên"
                autoComplete="off"
                disabled={watch('externalId').length > 0}
              />
            </Grid>
            <Grid xs={7}>
              <input type="submit" style={{ display: 'none' }} />
            </Grid>
          </Grid>
        </FormContainer>
      </Paper>
      <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
        <DataTable
          cellOutline
          disableRowSelectionOnClick
          rows={data?.items || []}
          autoRowHeight
          loading={isFetching || isDeleting}
          getRowId={(row) => row._id}
          columns={columns}
          paginationMode="server"
          rowCount={data?.total ?? 0}
          page={data?.offset!}
          pageSize={data?.limit!}
          onPageChange={props.setPage}
          onPageSizeChange={props.setPageSize}
        />
      </Box>
      <ConfirmDialog
        open={openDeleteItem != null}
        onClose={() => {
          setOpenDeleteItem(null)
        }}
        content="Tất cả các mẫu XN liên kết với bệnh nhân này cũng sẽ bị xoá!"
        onConfirm={() => {
          if (openDeleteItem != null) {
            // this should be async, but i like this behavior better
            handleDeletePatient(openDeleteItem)
          }
          setOpenDeleteItem(null)
        }}
      />
    </Box>
  )
}
