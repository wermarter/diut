import { Button, ButtonGroup } from '@mui/material'
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
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void
  itemIdField: keyof R
  firstField: string
  onRefresh: () => Promise<void> | void
  isLoading: boolean
}

export const NEW_ID_VALUE = 'NEW_ID_VALUE'

export function CrudToolbar<R extends GridValidRowModel>({
  setRows,
  setRowModesModel,
  itemIdField,
  firstField,
  onRefresh,
  isLoading,
}: CrudToolbarProps<R>) {
  const handleAddNew = () => {
    setRows((oldRows) => {
      const isAlreadyExist = oldRows.some(
        (row) => row[itemIdField] === NEW_ID_VALUE
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
    <GridToolbarContainer>
      <Button
        sx={{ m: 1 }}
        onClick={onRefresh}
        color="primary"
        variant="outlined"
        disabled={isLoading}
      >
        <LoopIcon />
      </Button>
      <ButtonGroup color="primary" variant="outlined" disabled={isLoading}>
        <Button startIcon={<AddIcon />} onClick={handleAddNew}>
          Thêm
        </Button>
      </ButtonGroup>
    </GridToolbarContainer>
  )
}
