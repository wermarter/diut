import * as React from 'react'
import { Role } from '@diut/common'

import {
  useUserCreateMutation,
  useUserDeleteByIdMutation,
  useUserSearchQuery,
  useUserUpdateByIdMutation,
  useLazyUserSearchQuery,
  UserResponseDto,
} from 'src/api/user'
import { CrudTable } from 'src/common/components/CrudTable'
import { userColumns } from './columns'
import { LoadingPage } from 'src/common/layout/LoadingPage'
import { useCrudPagination } from 'src/common/hooks'
import { SideAction } from 'src/common/components/SideAction'

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

  const [selectedUser, setSelectedUser] =
    React.useState<UserResponseDto | null>(null)
  const permissionOpen = Boolean(selectedUser)

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
              roles: [Role.User],
              permissions: [],
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
            searchUserRequestDto: { sort: { createdAt: -1 } },
          })
        }}
        customRowActions={[
          {
            label: 'Phân quyền',
            action(item) {
              setSelectedUser(item)
            },
          },
        ]}
      />
      <SideAction
        title="Phân quyền"
        open={permissionOpen}
        onClose={() => {
          setSelectedUser(null)
        }}
      />
    </>
  ) : (
    <LoadingPage />
  )
}
