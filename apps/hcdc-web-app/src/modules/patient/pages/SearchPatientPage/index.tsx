import { useState } from 'react'
import { Gender } from '@diut/hcdc-common'
import { DATETIME_FORMAT } from '@diut/common'
import { Box, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { GridActionsCellItem } from '@mui/x-data-grid'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { format } from 'date-fns'

import {
  usePatientDeleteByIdMutation,
  usePatientSearchQuery,
} from 'src/api/patient'
import { DataTable } from 'src/common/components/DataTable'
import { FormContainer, FormTextField } from 'src/common/form-elements'
import { useCrudPagination } from 'src/common/hooks'
import { ConfirmDialog } from 'src/common/components/ConfirmDialog'
import { useTypedSelector } from 'src/core'
import { selectUserIsAdmin } from 'src/modules/auth'

interface FilterData {
  externalId: string
  name: string
}

export default function SearchPatientPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const userIsAdmin = useTypedSelector(selectUserIsAdmin)

  const { filterObj, setFilterObj, onPageChange, onPageSizeChange } =
    useCrudPagination({
      offset: 0,
      limit: 10,
      sort: { createdAt: -1 },
    })

  const { control, handleSubmit, watch } = useForm<FilterData>({
    defaultValues: {
      externalId: searchParams.get('externalId') ?? '',
      name: searchParams.get('name') ?? '',
    },
  })

  const { data, isFetching } = usePatientSearchQuery({
    searchPatientRequestDto: filterObj,
  })
  const [deletePatient, { isLoading: isDeleting }] =
    usePatientDeleteByIdMutation()

  const handleSubmitFilter = ({ externalId, name }: FilterData) => {
    setSearchParams({
      externalId,
      name,
    })
    return setFilterObj((obj) => ({
      ...obj,
      filter: {
        ...obj.filter,
        externalId: externalId.length > 0 ? externalId : undefined,
        name:
          name.length > 0 ? { $regex: '^' + name, $options: 'i' } : undefined,
      },
    }))
  }

  const handleConfirmClick = (patientId: string) => {
    navigate('/result/print?patientId=' + patientId)
  }

  const [openDeleteItem, setOpenDeleteItem] = useState<string | null>(null)

  const handleDeleteClick = (patientId: string) => {
    if (patientId != undefined) {
      setOpenDeleteItem(patientId)
    }
  }

  const handleDeletePatient = async (patientId: string) => {
    await deletePatient({ id: patientId })
  }

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
                disabled={watch('name').length > 0}
              />
            </Grid>
            <Grid xs={3}>
              <FormTextField
                fullWidth
                control={control}
                name="name"
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
      <Box sx={{ flexGrow: 1 }}>
        <DataTable
          cellOutline
          disableRowSelectionOnClick
          rows={data?.items || []}
          autoRowHeight
          loading={isFetching || isDeleting}
          getRowId={(row) => row._id}
          columns={[
            {
              field: 'startActions',
              type: 'actions',
              width: 60,
              cellClassName: 'actions',
              getActions: ({ row }) => [
                <GridActionsCellItem
                  icon={<ManageSearchIcon />}
                  label="Tra cứu"
                  color="primary"
                  onClick={() => handleConfirmClick(row._id)}
                />,
              ],
            },
            {
              field: 'externalId',
              headerName: 'ID PK',
              sortable: false,
              width: 120,
            },
            {
              field: 'name',
              headerName: 'Họ tên',
              sortable: false,
              flex: 1,
              minWidth: 150,
            },
            {
              field: 'birthYear',
              headerName: 'Năm',
              sortable: false,
              width: 60,
            },
            {
              field: 'gender',
              headerName: 'Giới',
              sortable: false,
              width: 60,
              valueGetter: ({ value }) => {
                if (value === Gender.Male) {
                  return 'Nam'
                }
                return 'Nữ'
              },
            },
            {
              field: 'address',
              headerName: 'Địa chỉ',
              sortable: false,
              width: 200,
            },
            {
              field: 'phoneNumber',
              headerName: 'SĐT',
              sortable: false,
              width: 150,
            },
            {
              field: 'updatedAt',
              headerName: 'Ngày nhập',
              sortable: false,
              width: 100,
              valueGetter: ({ value }) => {
                return format(new Date(value), DATETIME_FORMAT)
              },
            },
            {
              field: 'endActions',
              type: 'actions',
              width: 60,
              cellClassName: 'actions',
              getActions: ({ row }) => [
                <GridActionsCellItem
                  disabled={!userIsAdmin}
                  icon={<DeleteForeverIcon />}
                  label="Xoá"
                  color="error"
                  onClick={() => handleDeleteClick(row._id)}
                />,
              ],
            },
          ]}
          paginationMode="server"
          rowCount={data?.total ?? 0}
          page={data?.offset ?? 0}
          pageSize={data?.limit ?? 10}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </Box>
      <ConfirmDialog
        open={openDeleteItem != null}
        onClose={() => {
          setOpenDeleteItem(null)
        }}
        content="Tất cả các mẫu XN liên kết với bệnh nhân này cũng sẽ bị xoá!"
        onConfirm={() => {
          // this should be async, but i like this behavior better
          if (openDeleteItem != null) {
            handleDeletePatient(openDeleteItem)
          }
          setOpenDeleteItem(null)
        }}
      />
    </Box>
  )
}
