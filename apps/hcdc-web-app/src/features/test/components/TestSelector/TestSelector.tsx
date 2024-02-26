import * as React from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import { groupBy } from 'lodash'

import { SideAction } from 'src/components/ui/SideAction'
import {
  useTestSearchQuery,
  TestResponseDto,
} from 'src/infra/api/access-service/test'
import { useTestComboSearchQuery } from 'src/infra/api/access-service/test-combo'

interface TestSelectorProps {
  open: boolean
  onClose: Function
  onSubmit: (selectedTest: TestResponseDto[]) => void
  previousState?: string[]
  showCombos?: boolean
}

export function TestSelector({
  open,
  onClose,
  onSubmit,
  previousState = [],
  showCombos = false,
}: TestSelectorProps) {
  const { data, isFetching } = useTestSearchQuery({
    sort: { displayIndex: 1 },
    populates: [{ path: 'testCategory', fields: ['name', 'displayIndex'] }],
  })

  const { data: combos, isFetching: isFetchingCombos } =
    useTestComboSearchQuery({ sort: { index: 1 } })

  const [selectedIds, setSelectedIds] = React.useState<string[]>([])

  React.useEffect(() => {
    if (isFetching === false) {
      setSelectedIds(
        previousState.filter((testId) =>
          data?.items.some((test) => test._id === testId),
        ),
      )
    }
  }, [JSON.stringify(previousState), isFetching])

  const categories: string[] = []
  const groups = groupBy(data?.items ?? [], (test) => {
    categories[test?.testCategory?.displayIndex!] = test?.testCategory?.name!
    return test?.testCategory?.name
  })

  const handleSubmit = () => {
    onSubmit(
      selectedIds.map((selectedId) => {
        return data?.items.find(({ _id }) => _id === selectedId)!
      }),
    )
    onClose()
  }

  const toggleSelected = (testId: string) => () => {
    setSelectedIds((ids) => {
      const target = ids.find((selectedId) => selectedId === testId)
      if (target != undefined) {
        return ids.filter((selectedId) => selectedId !== testId)
      } else {
        return ids.concat(testId)
      }
    })
  }

  return (
    <SideAction fullWidth open={open} onClose={onClose} title="Chọn xét nghiệm">
      <Box display={'flex'} sx={{ my: 2, justifyContent: 'space-between' }}>
        <ButtonGroup>
          <Button
            variant="outlined"
            onClick={() => {
              setSelectedIds([])
            }}
          >
            Reset
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Chọn ({selectedIds.length}) xét nghiệm
          </Button>
        </ButtonGroup>
        {showCombos && !isFetchingCombos && (
          <ButtonGroup color="secondary">
            {combos?.items!.map((combo) => (
              <Button
                key={combo._id}
                variant="outlined"
                onClick={() => {
                  setSelectedIds(combo.testIds)
                }}
              >
                {combo.name}
              </Button>
            ))}
          </ButtonGroup>
        )}
      </Box>
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
                <ListSubheader color="primary" disableSticky>
                  {groupName}
                </ListSubheader>
                {groups[groupName].map((test) => {
                  return (
                    <ListItem key={test._id} disablePadding>
                      <ListItemButton
                        dense
                        selected={selectedIds.some(
                          (selectedId) => selectedId === test._id,
                        )}
                        onClick={toggleSelected(test._id)}
                      >
                        <ListItemText
                          primaryTypographyProps={{
                            sx:
                              test.printFormId === undefined
                                ? {}
                                : { fontWeight: 'bold' },
                          }}
                          primary={test.name}
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
    </SideAction>
  )
}
