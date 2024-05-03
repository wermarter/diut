import * as React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  GridColDef,
  GridRowParams,
  MuiEvent,
  GridActionsCellItem,
  GridEventListener,
  GridValidRowModel,
} from '@mui/x-data-grid'

import { DataTable } from '../DataTable'
import { CrudToolbar } from './components/CrudToolbar'
import { ConfirmDialog } from 'src/components/ui'
import { trimObjectValues } from '@diut/common'

interface CustomRowAction<R extends GridValidRowModel> {
  label: string
  action: (item: R) => void
}

interface CrudTableProps<R extends GridValidRowModel> {
  items?: GridRowsProp<R>
  itemIdField: keyof R
  fieldColumns: GridColDef<R>[]
  onItemUpdate: (newItem: R, oldItem: R) => Promise<void> | void
  onItemCreate?: (item: R) => Promise<void> | void
  onItemDelete?: (item: R) => Promise<void> | void
  onRefresh?: () => Promise<void> | void
  isLoading?: boolean
  newItemId?: string

  rowCount?: number
  page?: number
  onPageChange?: (page: number) => void
  pageSize?: number
  onPageSizeChange?: (pageSize: number) => void

  TopRightComponent?: React.ReactNode
  TopLeftComponent?: React.ReactNode
  customRowActions?: CustomRowAction<R>[]
}

export function CrudTable<R extends GridValidRowModel>({
  items,
  itemIdField,
  fieldColumns,
  onItemCreate,
  onItemUpdate,
  onItemDelete,
  onRefresh,
  newItemId = 'NEW_ITEM_ID',
  isLoading = false,

  rowCount,
  page,
  onPageChange,
  onPageSizeChange,
  pageSize,

  TopRightComponent,
  TopLeftComponent,
  customRowActions = [],
}: CrudTableProps<R>) {
  const [rows, setRows] = React.useState<GridRowsProp<R>>([])
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  )

  React.useEffect(() => {
    if (items?.length != undefined) {
      setRows(items)
    }
  }, [items])

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>,
  ) => {
    event.defaultMuiPrevented = true
  }

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event,
  ) => {
    event.defaultMuiPrevented = true
  }

  const handleEditClick = (item: R) => () => {
    setRowModesModel({
      ...rowModesModel,
      [item[itemIdField]]: {
        mode: GridRowModes.Edit,
        fieldToFocus: columns?.[0]?.field,
      },
    })
  }

  const handleSaveClick = (item: R) => () => {
    setRowModesModel({
      ...rowModesModel,
      [item[itemIdField]]: { mode: GridRowModes.View },
    })
  }

  const [openDeleteItem, setOpenDeleteItem] = React.useState<R | null>(null)

  const handleDeleteClick = (item: R) => () => {
    if (onItemDelete != undefined) {
      setOpenDeleteItem(item)
    }
  }

  const handleCancelClick = (item: R) => () => {
    const id = item[itemIdField]
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    })

    if (id === newItemId) {
      setRows(rows.filter((row) => row[itemIdField] !== id))
    }
  }

  const processRowUpdate = async (newRow: R, oldRow: R) => {
    try {
      trimObjectValues(newRow)
    } catch (e) {
      console.error(e)
    }

    if (newRow[itemIdField] === newItemId) {
      if (onItemCreate != undefined) {
        await onItemCreate(newRow)
      }
    } else {
      await onItemUpdate(newRow, oldRow)
    }

    return newRow
  }

  const columns: GridColDef<R>[] = React.useMemo(() => {
    return [
      ...fieldColumns,
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ row }) => {
          const isInEditMode =
            rowModesModel[row[itemIdField]]?.mode === GridRowModes.Edit

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                color="primary"
                onClick={handleSaveClick(row)}
                disabled={isLoading}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                onClick={handleCancelClick(row)}
                disabled={isLoading}
              />,
            ]
          }

          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              onClick={handleEditClick(row)}
              color="primary"
              disabled={isLoading}
            />,
            ...customRowActions.map(({ label, action }) => {
              return (
                <GridActionsCellItem
                  label={label}
                  onClick={() => action(row)}
                  disabled={isLoading}
                  showInMenu
                />
              )
            }),
            onItemDelete != undefined ? (
              <GridActionsCellItem
                label="Xoá"
                onClick={handleDeleteClick(row)}
                disabled={isLoading}
                showInMenu
              />
            ) : (
              <></>
            ),
          ]
        },
      },
    ]
  }, [rowModesModel, isLoading])

  return (
    <>
      <DataTable
        sx={{ borderRadius: 0 }}
        rows={rows}
        getRowId={(item) => {
          return item[itemIdField]
        }}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={() => {}}
        slots={{
          toolbar: CrudToolbar,
        }}
        slotProps={{
          toolbar: {
            TopRightComponent,
            TopLeftComponent,
            setRows,
            setRowModesModel,
            itemIdField,
            onRefresh,
            isLoading,
            firstField: columns?.[0]?.field,
            allowAddNew: onItemCreate != undefined,
            newItemId,
          },
          pagination: {
            showFirstButton: true,
            showLastButton: true,
          },
        }}
        cellOutline
        loading={isLoading}
        paginationMode={rowCount != undefined ? 'server' : undefined}
        rowCount={rowCount}
        page={page}
        onPageChange={onPageChange}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
      />
      <ConfirmDialog
        contentText={JSON.stringify(openDeleteItem)}
        open={openDeleteItem != null}
        onClose={() => {
          setOpenDeleteItem(null)
        }}
        onConfirm={() => {
          if (openDeleteItem != null && onItemDelete != undefined) {
            onItemDelete(openDeleteItem)
          }
          setOpenDeleteItem(null)
        }}
      />
    </>
  )
}
