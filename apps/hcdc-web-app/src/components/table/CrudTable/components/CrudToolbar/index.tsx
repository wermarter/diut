import AddIcon from '@mui/icons-material/Add'
import LoopIcon from '@mui/icons-material/Loop'
import { Box, Button } from '@mui/material'
import {
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
  GridValidRowModel,
} from '@mui/x-data-grid'
import * as React from 'react'

interface CrudToolbarProps<R extends GridValidRowModel> {
  setRows: (newRows: (oldRows: GridRowsProp<R>) => GridRowsProp) => void
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void
  itemIdField: keyof R
  firstField: string
  isLoading: boolean
  newItemId: string
  TopRightComponent?: React.ReactNode
  TopLeftComponent?: React.ReactNode
  allowAddNew?: boolean
  onRefresh?: () => Promise<void> | void
}

export function CrudToolbar<R extends GridValidRowModel>({
  setRows,
  setRowModesModel,
  itemIdField,
  newItemId,
  firstField,
  isLoading,
  TopRightComponent,
  TopLeftComponent,
  onRefresh,
  allowAddNew = true,
}: CrudToolbarProps<R>) {
  const handleAddNew = () => {
    setRows((oldRows) => {
      const isAlreadyExist = oldRows.some(
        (row) => row[itemIdField] === newItemId,
      )
      if (isAlreadyExist) {
        return oldRows
      }
      return [{ [itemIdField]: newItemId }, ...oldRows]
    })
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [newItemId]: {
        mode: GridRowModes.Edit,
        fieldToFocus: firstField as string,
      },
    }))
  }

  return (
    <GridToolbarContainer
      sx={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <Box
        sx={{
          m: 1,
          display: 'flex',
        }}
      >
        {onRefresh != undefined && (
          <Button
            onClick={onRefresh}
            color="primary"
            variant="outlined"
            disabled={isLoading}
          >
            <LoopIcon />
          </Button>
        )}
        {allowAddNew && (
          <Button
            sx={{ mx: 1 }}
            fullWidth
            startIcon={<AddIcon />}
            onClick={handleAddNew}
            color="primary"
            variant="outlined"
            disabled={isLoading}
          >
            Thêm
          </Button>
        )}
        {TopLeftComponent}
      </Box>
      {TopRightComponent}
    </GridToolbarContainer>
  )
}
