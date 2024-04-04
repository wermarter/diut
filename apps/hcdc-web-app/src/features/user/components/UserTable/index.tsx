import { useEffect, useState } from 'react'

import {
  useUserCreateMutation,
  useUserDeleteByIdMutation,
  useUserSearchQuery,
  useUserUpdateByIdMutation,
  useLazyUserSearchQuery,
} from 'src/infra/api/access-service/user'
import { CrudTable } from 'src/components/table'
import { userColumns } from './columns'
import { usePagination } from 'src/shared/hooks'
import { useTypedSelector } from 'src/infra/redux'
import { ChangePassword, authSlice } from 'src/features/auth'

const USER_DEFAULT_PASSWORD = 'password'

type UserTableProps = {
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
}

export function UserTable(props: UserTableProps) {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const { filterObj, setFilterObj } = usePagination({
    offset: props.page,
    limit: props.pageSize,
    sort: { displayIndex: 1 },
    filter: { branchIds: branchId },
  })

  useEffect(() => {
    if (branchId) {
      setFilterObj((prev) => ({
        ...prev,
        filter: {
          ...filterObj.filter,
          branchIds: branchId,
        },
      }))
    }
  }, [branchId])

  const { data, isFetching } = useUserSearchQuery(filterObj)
  const [searchUsers] = useLazyUserSearchQuery()

  const [createUser, { isLoading: isCreating }] = useUserCreateMutation()
  const [updateUser, { isLoading: isUpdating }] = useUserUpdateByIdMutation()
  const [deleteUser, { isLoading: isDeleting }] = useUserDeleteByIdMutation()

  const [openChangePassword, setOpenChangePassword] = useState('')

  return (
    <>
      <CrudTable
        items={data?.items}
        itemIdField="_id"
        isLoading={isFetching || isCreating || isUpdating || isDeleting}
        fieldColumns={userColumns}
        rowCount={data?.total ?? 0}
        page={data?.offset!}
        pageSize={data?.limit!}
        onPageChange={props.setPage}
        onPageSizeChange={props.setPageSize}
        onItemCreate={async (item) => {
          await createUser({
            name: item.name,
            username: item.username,
            password: USER_DEFAULT_PASSWORD,
            phoneNumber: item.phoneNumber,
            branchIds: [branchId],
            inlinePermissions: [],
            roleIds: [],
          }).unwrap()
        }}
        onItemUpdate={async (newItem) => {
          await updateUser({
            id: newItem._id,
            userUpdateRequestDto: {
              name: newItem.name,
              username: newItem.username,
              phoneNumber: newItem.phoneNumber,
            },
          }).unwrap()
        }}
        onItemDelete={async (item) => {
          await deleteUser(item._id).unwrap()
        }}
        onRefresh={async () => {
          await searchUsers(filterObj).unwrap()
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
