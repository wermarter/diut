import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { SideAction } from 'src/components/ui'
import { authSlice } from 'src/features/auth'
import {
  BranchResponseDto,
  useBranchUpdateByIdMutation,
} from 'src/infra/api/access-service/branch'
import { useTypedSelector } from 'src/infra/redux'

interface BranchOriginSelectorProps {
  branch: BranchResponseDto | null
  onClose: Function
}

export function BranchOriginSelector(props: BranchOriginSelectorProps) {
  const [selectedIds, setSelectedIds] = useState(new Set<string>())
  const branches = useTypedSelector(authSlice.selectors.selectBranches)

  useEffect(() => {
    if (props.branch) {
      setSelectedIds(new Set(props.branch.sampleOriginIds))
    }
  }, [props.branch?._id])

  const toggleSelected = (branchId: string) => () => {
    setSelectedIds((idSet) => {
      if (idSet.has(branchId)) {
        idSet.delete(branchId)
      } else {
        idSet.add(branchId)
      }
      return new Set(idSet)
    })
  }

  const [updateBranch, { isLoading }] = useBranchUpdateByIdMutation()

  const handleSubmit = async () => {
    if (props.branch) {
      await updateBranch({
        id: props.branch._id,
        branchUpdateRequestDto: {
          sampleOriginIds: Array.from(selectedIds),
        },
      })
      props.onClose()
    }
  }

  return (
    <SideAction
      open={props.branch !== null}
      onClose={props.onClose}
      title={props.branch?.name!}
      disableClickOutside={isLoading}
    >
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleSubmit}
        fullWidth
      >
        Lưu
      </Button>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <List
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
          {branches?.map((branch) => {
            return (
              <ListItem key={branch._id} disablePadding>
                <ListItemButton
                  dense
                  selected={selectedIds.has(branch._id)}
                  onClick={toggleSelected(branch._id)}
                >
                  <ListItemText
                    primary={branch.name}
                    secondary={branch.address}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Box>
    </SideAction>
  )
}
