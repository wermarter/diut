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
  components,
  ...otherDataGridProps
}: DataTableProps<R>) {
  return (
    <DataGrid
      autoHeight
      disableColumnMenu
      disableSelectionOnClick
      sx={[
        {
          '.MuiDataGrid-columnHeader:focus-within': {
            outline: 'none !important',
          },
        },
        !cellOutline
          ? {
              '.MuiDataGrid-cell:focus-within': {
                outline: 'none !important',
              },
            }
          : (theme) => ({
              '.MuiDataGrid-cell:focus-within': {
                outlineColor: `${theme.palette.secondary.main} !important`,
              },
            }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
      components={Object.assign(
        {},
        {
          LoadingOverlay: ProgressBar,
          NoRowsOverlay: EmptyRowsOverlay,
        },
        components
      )}
      {...otherDataGridProps}
    />
  )
}
