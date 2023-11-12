import * as React from 'react'
import { Box, Button } from '@mui/material'
import {
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
  GridValidRowModel,
} from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import LoopIcon from '@mui/icons-material/Loop'

interface CrudToolbarProps<R extends GridValidRowModel> {
  setRows: (newRows: (oldRows: GridRowsProp<R>) => GridRowsProp) => void
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void
  itemIdField: keyof R
  firstField: string
  isLoading: boolean
  TopRightComponent: React.ReactNode
  allowAddNew?: boolean
  onRefresh?: () => Promise<void> | void
}

export const NEW_ID_VALUE = 'NEW_ID_VALUE'

export function CrudToolbar<R extends GridValidRowModel>({
  setRows,
  setRowModesModel,
  itemIdField,
  firstField,
  isLoading,
  TopRightComponent,
  onRefresh,
  allowAddNew = true,
}: CrudToolbarProps<R>) {
  const handleAddNew = () => {
    setRows((oldRows) => {
      const isAlreadyExist = oldRows.some(
        (row) => row[itemIdField] === NEW_ID_VALUE,
      )
      if (isAlreadyExist) {
        return oldRows
      }
      return [{ [itemIdField]: NEW_ID_VALUE }, ...oldRows]
    })
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [NEW_ID_VALUE]: {
        mode: GridRowModes.Edit,
        fieldToFocus: firstField as string,
      },
    }))
  }

  return (
    <GridToolbarContainer
      sx={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <Box sx={{ m: 1 }}>
        {onRefresh !== undefined && (
          <Button
            sx={{ mr: 1 }}
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
            startIcon={<AddIcon />}
            onClick={handleAddNew}
            color="primary"
            variant="outlined"
            disabled={isLoading}
          >
            Thêm
          </Button>
        )}
      </Box>
      <Box sx={{ m: 1 }}>{TopRightComponent}</Box>
    </GridToolbarContainer>
  )
}
