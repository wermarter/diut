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
    autoRowHeight?: boolean
  }

export function DataTable<R extends GridValidRowModel>({
  cellOutline = false,
  autoRowHeight = false,
  sx,
  components,
  ...otherDataGridProps
}: DataTableProps<R>) {
  return (
    <DataGrid
      disableColumnMenu
      getRowHeight={() => {
        if (autoRowHeight === true) {
          return 'auto'
        }
        return null
      }}
      getEstimatedRowHeight={() => 100}
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
        autoRowHeight && {
          '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: 1 },
          '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
            py: 2,
          },
          '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
            py: 3,
          },
        },
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
