import { useEffect, useState } from 'react'

import {
  useUserCreateMutation,
  useUserDeleteByIdMutation,
  useUserSearchQuery,
  useUserUpdateByIdMutation,
  useLazyUserSearchQuery,
  UserResponseDto,
} from 'src/infra/api/access-service/user'
import { CrudTable } from 'src/components/table'
import { useUserColumns } from './columns'
import { usePagination } from 'src/shared/hooks'
import { useTypedSelector } from 'src/infra/redux'
import { ChangePassword, authSlice } from 'src/features/auth'
import { RoleResponseDto } from 'src/infra/api/access-service/role'
import { UserRoleSelector } from '../UserRoleSelector'
import { UserBranchSelector } from '../UserBranchSelector'
import { BranchResponseDto } from 'src/infra/api/access-service/branch'

const USER_DEFAULT_PASSWORD = 'password'

type UserTableProps = {
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  roleMap: Map<string, RoleResponseDto>
  roles: RoleResponseDto[]
  branches: BranchResponseDto[]
}

export function UserTable(props: UserTableProps) {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const { filterObj, setFilterObj } = usePagination({
    offset: props.page,
    limit: props.pageSize,
    sort: { displayIndex: 1 },
    filter: { branchIds: branchId },
  })

  const [searchUsers] = useLazyUserSearchQuery()
  const { data, isFetching } = useUserSearchQuery(filterObj)
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

  const [createUser, { isLoading: isCreating }] = useUserCreateMutation()
  const [updateUser, { isLoading: isUpdating }] = useUserUpdateByIdMutation()
  const [deleteUser, { isLoading: isDeleting }] = useUserDeleteByIdMutation()

  const [changePassword, setChangePassword] = useState('')
  const [manageUserRole, setManageUserRole] = useState<UserResponseDto | null>(
    null,
  )
  const [manageUserBranch, setManageUserBranch] =
    useState<UserResponseDto | null>(null)

  const userColumns = useUserColumns(props.roleMap)

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
            label: 'Phân quyền',
            action: (item) => {
              setManageUserRole(item)
            },
          },
          {
            label: 'Chi nhánh',
            action: (item) => {
              setManageUserBranch(item)
            },
          },
          {
            label: 'Mật khẩu',
            action: (item) => {
              setChangePassword(item._id)
            },
          },
        ]}
      />
      <ChangePassword
        open={Boolean(changePassword)}
        userId={changePassword}
        onClose={() => {
          setChangePassword('')
        }}
      />
      <UserRoleSelector
        user={manageUserRole}
        branchRoles={props.roles}
        onClose={() => {
          setManageUserRole(null)
        }}
      />
      <UserBranchSelector
        user={manageUserBranch}
        branches={props.branches}
        onClose={() => {
          setManageUserBranch(null)
        }}
      />
    </>
  )
}
