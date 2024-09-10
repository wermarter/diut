import {
  DataGrid,
  DataGridProps,
  GridCallbackDetails,
  GridPaginationModel,
  GridValidRowModel,
  viVN,
} from '@mui/x-data-grid'
import { useCallback } from 'react'

import { ProgressBar } from 'src/components/ui'
import { ROWS_PER_PAGE_OPTIONS } from 'src/shared'
import { EmptyRowsOverlay } from './components/EmptyRows'

export type DataTableProps<R extends GridValidRowModel> = DataGridProps<R> &
  React.RefAttributes<HTMLDivElement> & {
    cellOutline?: boolean
    autoRowHeight?: boolean
    page?: number
    pageSize?: number
    onPageChange?: (page: number) => void
    onPageSizeChange?: (pageSize: number) => void
  }

export function DataTable<R extends GridValidRowModel>({
  cellOutline = false,
  autoRowHeight = false,
  sx,
  slots,
  page = 0,
  pageSize = ROWS_PER_PAGE_OPTIONS[0],
  onPageChange,
  onPageSizeChange,
  ...otherDataGridProps
}: DataTableProps<R>) {
  const handlePaginationModelChange: DataGridProps['onPaginationModelChange'] =
    useCallback(
      (model: GridPaginationModel, details: GridCallbackDetails) => {
        if (pageSize !== model.pageSize) {
          onPageSizeChange?.(model.pageSize)
        }
        if (page !== model.page) {
          onPageChange?.(model.page)
        }
      },
      [page, pageSize],
    )

  return (
    <DataGrid
      disableColumnMenu
      disableVirtualization
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
      slots={Object.assign(
        {},
        {
          loadingOverlay: ProgressBar,
          noRowsOverlay: EmptyRowsOverlay,
        },
        slots,
      )}
      pageSizeOptions={ROWS_PER_PAGE_OPTIONS}
      paginationModel={{ page, pageSize }}
      onPaginationModelChange={handlePaginationModelChange}
      {...otherDataGridProps}
    />
  )
}
