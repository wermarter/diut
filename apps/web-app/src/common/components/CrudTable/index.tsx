import * as React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  GridColumns,
  GridRowParams,
  MuiEvent,
  GridActionsCellItem,
  GridEventListener,
  GridValidRowModel,
  GridCallbackDetails,
} from '@mui/x-data-grid'

import { DataTable } from '../DataTable'
import { CrudToolbar, NEW_ID_VALUE } from './components/CrudToolbar'
import { ConfirmDialog } from '../ConfirmDialog'

interface CustomRowAction<R extends GridValidRowModel> {
  label: string
  action: (item: R) => void
}

interface CrudTableProps<R extends GridValidRowModel> {
  items: GridRowsProp<R>
  itemIdField: keyof R
  fieldColumns: GridColumns<R>
  onItemUpdate: (newItem: R, oldItem: R) => Promise<void> | void
  onItemCreate?: (item: R) => Promise<void> | void
  onItemDelete?: (item: R) => Promise<void> | void
  onRefresh?: () => Promise<void> | void
  isLoading?: boolean

  rowCount?: number
  page?: number
  onPageChange?: (page: number, details: GridCallbackDetails<any>) => void
  pageSize?: number
  onPageSizeChange?: (
    pageSize: number,
    details: GridCallbackDetails<any>
  ) => void

  TopRightComponent?: React.ReactNode
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
  isLoading = false,

  rowCount,
  page,
  onPageChange,
  onPageSizeChange,
  pageSize,

  TopRightComponent,
  customRowActions = [],
}: CrudTableProps<R>) {
  const [rows, setRows] = React.useState<GridRowsProp<R>>([])
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  )

  React.useEffect(() => {
    if (items?.length !== undefined) {
      setRows(items)
    }
  }, [items])

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    event.defaultMuiPrevented = true
  }

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
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
    if (onItemDelete !== undefined) {
      setOpenDeleteItem(item)
    }
  }

  const handleCancelClick = (item: R) => () => {
    const id = item[itemIdField]
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    })

    if (id === NEW_ID_VALUE) {
      setRows(rows.filter((row) => row[itemIdField] !== id))
    }
  }

  const processRowUpdate = async (newRow: R, oldRow: R) => {
    if (newRow[itemIdField] === NEW_ID_VALUE) {
      if (onItemCreate !== undefined) {
        await onItemCreate(newRow)
      }
    } else {
      await onItemUpdate(newRow, oldRow)
    }

    return newRow
  }

  const columns: GridColumns<R> = React.useMemo(() => {
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
            onItemDelete !== undefined ? (
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
        sx={{ minWidth: '50vw', borderRadius: 0 }}
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
        components={{
          Toolbar: CrudToolbar,
        }}
        componentsProps={{
          toolbar: {
            TopRightComponent,
            setRows,
            setRowModesModel,
            itemIdField,
            onRefresh,
            isLoading,
            firstField: columns?.[0]?.field,
            allowAddNew: onItemCreate !== undefined,
          },
          pagination: {
            showFirstButton: true,
            showLastButton: true,
          },
        }}
        experimentalFeatures={{ newEditingApi: true }}
        cellOutline
        loading={isLoading}
        rowsPerPageOptions={[5, 10, 20, 100]}
        paginationMode={rowCount !== undefined ? 'server' : undefined}
        rowCount={rowCount}
        page={page}
        onPageChange={onPageChange}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
      />
      <ConfirmDialog
        content={JSON.stringify(openDeleteItem)}
        open={openDeleteItem !== null}
        onClose={() => {
          setOpenDeleteItem(null)
        }}
        onConfirm={() => {
          if (openDeleteItem !== null && onItemDelete !== undefined) {
            onItemDelete(openDeleteItem)
          }
          setOpenDeleteItem(null)
        }}
      />
    </>
  )
}
