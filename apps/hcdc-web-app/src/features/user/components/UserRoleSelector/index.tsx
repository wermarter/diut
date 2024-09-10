import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

import { SideAction } from 'src/components/ui'
import { RoleResponseDto } from 'src/infra/api/access-service/role'
import {
  UserResponseDto,
  useUserUpdateByIdMutation,
} from 'src/infra/api/access-service/user'

interface UserRoleSelectorProps {
  user: UserResponseDto | null
  onClose: Function
  branchRoles: RoleResponseDto[]
}

export function UserRoleSelector(props: UserRoleSelectorProps) {
  const [selectedIds, setSelectedIds] = useState(new Set<string>())
  const [numHiddenRoles, setNumHiddenRoles] = useState(0)

  useEffect(() => {
    if (props.user) {
      setSelectedIds(new Set(props.user.roleIds))
      setNumHiddenRoles(
        props.user.roleIds.filter(
          (roleId) => !props.branchRoles.some(({ _id }) => _id === roleId),
        ).length,
      )
    }
  }, [props.user?._id])

  const toggleSelected = (testId: string) => () => {
    setSelectedIds((idSet) => {
      if (idSet.has(testId)) {
        idSet.delete(testId)
      } else {
        idSet.add(testId)
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
          roleIds: Array.from(selectedIds),
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
        sx={{ m: 2, justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit}
          sx={{ flexGrow: 1 }}
        >
          Lưu
        </Button>
        {numHiddenRoles > 0 && (
          <Typography sx={{ ml: 2 }}>
            Đã ẩn {numHiddenRoles} phân quyền
          </Typography>
        )}
      </Box>
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
          {props.branchRoles.map((role) => {
            return (
              <ListItem key={role._id} disablePadding>
                <ListItemButton
                  dense
                  selected={selectedIds.has(role._id)}
                  onClick={toggleSelected(role._id)}
                >
                  <ListItemText
                    primary={role.name}
                    secondary={role.description}
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
