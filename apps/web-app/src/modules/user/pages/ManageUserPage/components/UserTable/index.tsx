import * as React from 'react'
import { Skeleton } from '@mui/material'

import {
  useUserCreateMutation,
  useUserDeleteByIdMutation,
  useUserSearchQuery,
  useUserUpdateByIdMutation,
  useLazyUserSearchQuery,
} from 'src/api/user'
import { CrudTable } from 'src/common/components/CrudTable'
import { userColumns } from './columns'
import { useCrudPagination } from 'src/common/hooks'
import { ChangePassword } from 'src/common/components/ChangePassword'

const USER_DEFAULT_PASSWORD = 'password'

export function UserTable() {
  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination()

  const { data, isFetching } = useUserSearchQuery({
    searchUserRequestDto: filterObj,
  })
  const [searchUsers] = useLazyUserSearchQuery()

  const [createUser, { isLoading: isCreating }] = useUserCreateMutation()
  const [updateUser, { isLoading: isUpdating }] = useUserUpdateByIdMutation()
  const [deleteUser, { isLoading: isDeleting }] = useUserDeleteByIdMutation()

  const [openChangePassword, setOpenChangePassword] = React.useState('')

  return data?.items !== undefined ? (
    <>
      <CrudTable
        items={data?.items}
        itemIdField="_id"
        isLoading={isFetching || isCreating || isUpdating || isDeleting}
        fieldColumns={userColumns}
        rowCount={data?.total!}
        page={data?.offset!}
        pageSize={data?.limit!}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onItemCreate={async (item) => {
          await createUser({
            createUserRequestDto: {
              name: item.name,
              username: item.username,
              password: USER_DEFAULT_PASSWORD,
              phoneNumber: item.phoneNumber,
              roles: item?.roles ?? [],
              permissions: item?.permissions ?? [],
            },
          })
        }}
        onItemUpdate={async (newItem, oldItem) => {
          await updateUser({
            id: newItem._id,
            updateUserRequestDto: {
              name: newItem.name,
              username: newItem.username,
              phoneNumber: newItem.phoneNumber,
              permissions: newItem.permissions,
              roles: newItem.roles,
            },
          })
        }}
        onItemDelete={async (item) => {
          await deleteUser({
            id: item._id,
          })
        }}
        onRefresh={async () => {
          await searchUsers({
            searchUserRequestDto: filterObj,
          })
        }}
        customRowActions={[
          {
            label: 'Đổi mật khẩu',
            action: (item) => {
              setOpenChangePassword(item._id)
            },
          },
        ]}
      />
      <ChangePassword
        open={Boolean(openChangePassword)}
        userId={openChangePassword}
        onClose={() => {
          setOpenChangePassword('')
        }}
      />
    </>
  ) : (
    <Skeleton variant="rectangular" width="100%" height="300px" />
  )
}
