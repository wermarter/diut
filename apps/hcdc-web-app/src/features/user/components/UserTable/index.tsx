import * as React from 'react'

import {
  useUserCreateMutation,
  useUserDeleteByIdMutation,
  useUserSearchQuery,
  useUserUpdateByIdMutation,
  useLazyUserSearchQuery,
} from 'src/infra/api/access-service/user'
import { CrudTable } from 'src/components/table'
import { userColumns } from './columns'
import { useCrudPagination } from 'src/shared/hooks'
import { ChangePassword } from 'src/components/layout/AppBar/components/ChangePassword'

const USER_DEFAULT_PASSWORD = 'password'

export function UserTable() {
  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination()

  const { data, isFetching } = useUserSearchQuery(filterObj)
  const [searchUsers] = useLazyUserSearchQuery()

  const [createUser, { isLoading: isCreating }] = useUserCreateMutation()
  const [updateUser, { isLoading: isUpdating }] = useUserUpdateByIdMutation()
  const [deleteUser, { isLoading: isDeleting }] = useUserDeleteByIdMutation()

  const [openChangePassword, setOpenChangePassword] = React.useState('')

  return (
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
              permissions: item?.permissions ?? [],
            },
          }).unwrap()
        }}
        onItemUpdate={async (newItem, oldItem) => {
          await updateUser({
            id: newItem._id,
            updateUserRequestDto: {
              name: newItem.name,
              username: newItem.username,
              phoneNumber: newItem.phoneNumber,
              permissions: newItem.permissions,
            },
          }).unwrap()
        }}
        onItemDelete={async (item) => {
          await deleteUser({
            id: item._id,
          }).unwrap()
        }}
        onRefresh={async () => {
          await searchUsers({
            searchUserRequestDto: filterObj,
          }).unwrap()
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
  )
}