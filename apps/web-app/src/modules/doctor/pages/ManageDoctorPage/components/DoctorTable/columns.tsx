import { GridActionsCellItem, GridColumns } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import SecurityIcon from '@mui/icons-material/Security'
import FileCopyIcon from '@mui/icons-material/FileCopy'

import { DoctorResponseDto } from 'src/api/doctor'

export const doctorColumns: GridColumns<DoctorResponseDto> = [
  {
    field: 'name',
    headerName: 'Tên',
    flex: 1,
    sortable: false,
    editable: true,
  },
  // {
  //   field: 'actions',
  //   type: 'actions',
  //   width: 80,
  //   getActions: (params) => [
  //     <GridActionsCellItem
  //       icon={<DeleteIcon />}
  //       label="Delete"
  //       // onClick={deleteUser(params.id)}
  //     />,
  //     <GridActionsCellItem
  //       icon={<SecurityIcon />}
  //       label="Toggle Admin"
  //       showInMenu
  //     />,
  //     <GridActionsCellItem
  //       icon={<FileCopyIcon />}
  //       label="Duplicate User"
  //       showInMenu
  //     />,
  //   ],
  // },
]
