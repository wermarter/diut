import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import { useEffect } from 'react'
import { DoctorResponseDto, useDoctorSearchMutation } from 'src/api/doctor'

const columns: GridColDef<DoctorResponseDto>[] = [
  {
    field: 'name',
    headerName: 'Tên',
    sortable: false,
    width: 200,
  },
]

export function ManageDoctorPage() {
  const [searchDoctors, { isUninitialized, data }] = useDoctorSearchMutation()
  useEffect(() => {
    if (isUninitialized) searchDoctors({ searchDoctorRequestDto: {} })
  }, [])

  return (
    data?.items!?.length > 0 && (
      <Box sx={{ width: '100%' }}>
        <DataGrid
          rows={data?.items!}
          columns={columns}
          autoHeight
          pageSize={10}
          rowsPerPageOptions={[5, 10]}
          checkboxSelection
          getRowId={(item) => {
            return item._id
          }}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: { showQuickFilter: true },
          }}
        />
      </Box>
    )
  )
}
