import { USER_DEFAULT_PASSWORD } from '@diut/hcdc'
import AddIcon from '@mui/icons-material/Add'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'

import { CrudTable } from 'src/components/table'
import { ConfirmDialog } from 'src/components/ui'
import { authSlice, ChangePassword } from 'src/features/auth'
import { BranchResponseDto } from 'src/infra/api/access-service/branch'
import { RoleResponseDto } from 'src/infra/api/access-service/role'
import {
  useLazyUserSearchQuery,
  UserResponseDto,
  useUserBranchAuthorizeMutation,
  useUserBranchDeauthorizeMutation,
  useUserCreateMutation,
  useUserDeleteByIdMutation,
  useUserSearchQuery,
  useUserUpdateByIdMutation,
} from 'src/infra/api/access-service/user'
import { useTypedSelector } from 'src/infra/redux'
import { usePagination } from 'src/shared/hooks'
import { UserRoleSelector } from '../UserRoleSelector'
import { UserSelectDialog } from '../UserSelectDialog'
import { useUserColumns } from './columns'

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
  const branch = useTypedSelector((state) =>
    authSlice.selectors.selectActiveBranch(state, branchId),
  )!
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
  const [deauthorizeUser, { isLoading: isDeauthorizing }] =
    useUserBranchDeauthorizeMutation()
  const [authorizeUser, { isLoading: isAuthorizing }] =
    useUserBranchAuthorizeMutation()

  const [changePassword, setChangePassword] = useState('')
  const [manageUserRole, setManageUserRole] = useState<UserResponseDto | null>(
    null,
  )
  const [branchDeauthorizeUser, setBranchDeauthorizeUser] =
    useState<UserResponseDto | null>(null)
  const [isAuthorizeOpen, setIsAuthorizeOpen] = useState(false)

  const userColumns = useUserColumns(props.roleMap)

  return (
    <>
      <CrudTable
        items={data?.items}
        itemIdField="_id"
        isLoading={
          isFetching ||
          isCreating ||
          isUpdating ||
          isDeleting ||
          isAuthorizing ||
          isDeauthorizing
        }
        fieldColumns={userColumns}
        rowCount={data?.total ?? 0}
        page={data?.offset!}
        pageSize={data?.limit!}
        onPageChange={props.setPage}
        onPageSizeChange={props.setPageSize}
        TopLeftComponent={
          <Button
            fullWidth
            size="large"
            startIcon={<AddIcon />}
            variant="outlined"
            color="secondary"
            onClick={() => {
              setIsAuthorizeOpen(true)
            }}
          >
            nhập
          </Button>
        }
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
            label: 'Mật khẩu',
            action: (item) => {
              setChangePassword(item._id)
            },
          },
          {
            label: 'Loại bỏ',
            action: (item) => {
              setBranchDeauthorizeUser(item)
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
      <ConfirmDialog
        contentText={`Loại bỏ "${branchDeauthorizeUser?.name!}" ra khỏi chi nhánh ${branch.name}`}
        open={branchDeauthorizeUser != null}
        onClose={() => {
          setBranchDeauthorizeUser(null)
        }}
        onConfirm={() => {
          deauthorizeUser({
            userId: branchDeauthorizeUser!._id,
            branchId,
          })
        }}
      />
      <UserSelectDialog
        open={isAuthorizeOpen}
        onClose={() => setIsAuthorizeOpen(false)}
        excludeBranchId={branchId}
        onSubmit={(userIds) => {
          userIds.forEach((userId) => {
            authorizeUser({
              userId,
              branchId,
            })
          })
        }}
      />
    </>
  )
}
