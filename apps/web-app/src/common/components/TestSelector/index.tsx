import * as React from 'react'
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import { groupBy } from 'lodash-es'

import { SideAction } from 'src/common/components/SideAction'
import { useTestSearchQuery } from 'src/api/test'

interface TestSelectorProps {
  open: boolean
  onClose: Function
  onSubmit: (selectedTest: string[]) => void
  previousState?: string[]
}

export function TestSelector({
  open,
  onClose,
  onSubmit,
  previousState = [],
}: TestSelectorProps) {
  const { data, isFetching } = useTestSearchQuery({
    searchTestRequestDto: {
      sort: { leftRightIndex: 1 },
    },
  })

  const [selectedIds, setSelectedIds] = React.useState<string[]>([])

  React.useEffect(() => {
    if (isFetching === false) {
      setSelectedIds(
        previousState.filter((testId) =>
          data?.items.some((test) => test.category && test._id === testId)
        )
      )
    }
  }, [JSON.stringify(previousState), isFetching])

  const categories: string[] = []
  const groups = groupBy(data?.items ?? [], (test) => {
    categories[test?.category?.leftRightIndex] = test?.category?.name
    return test?.category?.name
  })

  const handleSubmit = () => {
    onSubmit(selectedIds)
    onClose()
  }

  const toggleSelected = (testId: string) => () => {
    setSelectedIds((ids) => {
      const target = ids.find((selectedId) => selectedId === testId)
      if (target !== undefined) {
        return ids.filter((selectedId) => selectedId !== testId)
      } else {
        return ids.concat(testId)
      }
    })
  }

  return (
    <SideAction fullWidth open={open} onClose={onClose} title="Chọn xét nghiệm">
      {!isFetching && (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          {categories.map((groupName) => {
            return (
              <List
                key={groupName}
                sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                  '&& .Mui-selected, && .Mui-selected:hover': {
                    bgcolor: 'secondary.main',
                    '&, & .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                  mx: 1,
                }}
              >
                <ListSubheader color="primary">{groupName}</ListSubheader>
                {groups[groupName].map((test) => {
                  return (
                    <ListItem key={test._id} disablePadding>
                      <ListItemButton
                        dense
                        selected={selectedIds.some(
                          (selectedId) => selectedId === test._id
                        )}
                        onClick={toggleSelected(test._id)}
                      >
                        <ListItemText
                          primary={test.name}
                          secondary={test.bioProduct?.name}
                        />
                      </ListItemButton>
                    </ListItem>
                  )
                })}
              </List>
            )
          })}
        </Box>
      )}
      <Button
        fullWidth
        sx={{ mt: 3 }}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Chọn {selectedIds.length} xét nghiệm
      </Button>
    </SideAction>
  )
}
