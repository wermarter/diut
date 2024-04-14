import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material'

import { SideAction } from 'src/components/ui'
import {
  UserResponseDto,
  useUserUpdateByIdMutation,
} from 'src/infra/api/access-service/user'
import { BranchResponseDto } from 'src/infra/api/access-service/branch'
import { BranchType, BranchTypeValues } from '@diut/hcdc'

interface UserBranchSelectorProps {
  user: UserResponseDto | null
  onClose: Function
  branches: BranchResponseDto[]
}

export function UserBranchSelector(props: UserBranchSelectorProps) {
  const [selectedIds, setSelectedIds] = useState(new Set<string>())

  useEffect(() => {
    if (props.user) {
      setSelectedIds(new Set(props.user.branchIds))
    }
  }, [props.user?._id])

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

  const [updateUser, { isLoading }] = useUserUpdateByIdMutation()

  const handleSubmit = async () => {
    if (props.user) {
      await updateUser({
        id: props.user._id,
        userUpdateRequestDto: {
          branchIds: Array.from(selectedIds),
        },
      })
      props.onClose()
    }
  }

  return (
    <SideAction
      open={props.user !== null}
      onClose={props.onClose}
      title={props.user?.name!}
      disableClickOutside={isLoading}
    >
      <Box
        display={'flex'}
        sx={{
          mx: 2,
          mt: 2,
          mb: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
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
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {BranchTypeValues.map((branchType) => (
          <List
            key={branchType}
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
              {branchType === BranchType.Internal ? 'Nội bộ' : 'Bên ngoài'}
            </ListSubheader>
            {props.branches
              .filter(({ type }) => type === branchType)
              .map((branch) => {
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
        ))}
      </Box>
    </SideAction>
  )
}
