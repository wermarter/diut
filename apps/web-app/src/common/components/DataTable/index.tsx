import {
  DataGrid,
  DataGridProps,
  GridValidRowModel,
  viVN,
} from '@mui/x-data-grid'

import { ProgressBar } from '../ProgressBar'
import { EmptyRowsOverlay } from './components/EmptyRows'

export type DataTableProps<R extends GridValidRowModel> = DataGridProps<R> &
  React.RefAttributes<HTMLDivElement> & {
    cellOutline?: boolean
  }

export function DataTable<R extends GridValidRowModel>({
  cellOutline = false,
  sx,
  ...otherDataGridProps
}: DataTableProps<R>) {
  return (
    <DataGrid
      autoHeight
      disableColumnMenu
      disableSelectionOnClick
      rowsPerPageOptions={[10, 50, 100]}
      getRowId={(item) => {
        return item._id
      }}
      components={{
        LoadingOverlay: ProgressBar,
        NoRowsOverlay: EmptyRowsOverlay,
      }}
      experimentalFeatures={{ newEditingApi: true, columnGrouping: true }}
      sx={[
        {
          '.MuiDataGrid-columnHeader:focus-within': {
            outline: 'none !important',
          },
        },
        !cellOutline && {
          '.MuiDataGrid-cell:focus-within': {
            outline: 'none !important',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
      {...otherDataGridProps}
    />
  )
}
