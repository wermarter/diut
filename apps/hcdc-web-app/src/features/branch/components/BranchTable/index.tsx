import { ReportTypeValues } from '@diut/hcdc'
import { useState } from 'react'
import { CrudTable } from 'src/components/table'
import { authSlice } from 'src/features/auth'
import {
  BranchResponseDto,
  useBranchCreateMutation,
  useBranchDeleteByIdMutation,
  useBranchUpdateByIdMutation,
} from 'src/infra/api/access-service/branch'
import { useTypedSelector } from 'src/infra/redux'
import { BranchOriginSelector } from '../BranchOriginSelector'
import { branchColumns } from './columns'

type BranchTableProps = {
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
}

export function BranchTable(props: BranchTableProps) {
  const branches = useTypedSelector(authSlice.selectors.selectBranches)!

  const [openBranchOriginAction, setOpenBranchOriginAction] =
    useState<BranchResponseDto | null>(null)

  const [createBranch, { isLoading: isCreating }] = useBranchCreateMutation()
  const [updateBranch, { isLoading: isUpdating }] =
    useBranchUpdateByIdMutation()
  const [deleteBranch, { isLoading: isDeleting }] =
    useBranchDeleteByIdMutation()

  return (
    <>
      <CrudTable
        items={branches}
        itemIdField="_id"
        isLoading={isCreating || isUpdating || isDeleting}
        fieldColumns={branchColumns}
        page={props.page}
        pageSize={props.pageSize}
        onPageChange={props.setPage}
        onPageSizeChange={props.setPageSize}
        customRowActions={[
          {
            label: 'Liên kết đơn vị',
            action: (item) => {
              setOpenBranchOriginAction(item)
            },
          },
        ]}
        onItemCreate={async (item) => {
          const { _id } = await createBranch({
            type: 'Internal',
            name: item.name,
            displayIndex: item.displayIndex,
            address: item.address,
            phoneNumber: item.phoneNumber,
            sampleOriginIds: [],
            reportConfig: Object.fromEntries(
              ReportTypeValues.map((reportType) => [
                reportType,
                { testIds: [] },
              ]),
            ),
          }).unwrap()
          await updateBranch({
            id: _id,
            branchUpdateRequestDto: {
              sampleOriginIds: [_id],
            },
          }).unwrap()
        }}
        onItemUpdate={async (newItem) => {
          await updateBranch({
            id: newItem._id,
            branchUpdateRequestDto: {
              name: newItem.name,
              displayIndex: newItem.displayIndex,
              address: newItem.address,
              phoneNumber: newItem.phoneNumber,
            },
          }).unwrap()
        }}
        onItemDelete={async (item) => {
          await deleteBranch(item._id).unwrap()
        }}
      />
      <BranchOriginSelector
        branch={openBranchOriginAction}
        onClose={() => {
          setOpenBranchOriginAction(null)
        }}
      />
    </>
  )
}
