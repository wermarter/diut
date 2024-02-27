import * as React from 'react'
import { Skeleton } from '@mui/material'

import {
  useTestComboCreateMutation,
  useTestComboDeleteByIdMutation,
  useTestComboSearchQuery,
  useTestComboUpdateByIdMutation,
  useLazyTestComboSearchQuery,
  TestComboResponseDto,
} from 'src/infra/api/access-service/test-combo'
import { CrudTable } from 'src/components/table'
import { useCrudPagination } from 'src/shared/hooks'
import { testComboColumns } from './columns'
import { TestSelector } from 'src/features/test'
import { authSlice } from 'src/features/auth'
import { useTypedSelector } from 'src/infra/redux'

export function TestComboTable() {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination({
    sort: { displayIndex: 1 },
    filter: { branchId },
    offset: 0,
  })

  const { data, isFetching } = useTestComboSearchQuery(filterObj)
  const [searchTestCombos] = useLazyTestComboSearchQuery()

  const [createTestCombo, { isLoading: isCreating }] =
    useTestComboCreateMutation()
  const [updateTestCombo, { isLoading: isUpdating }] =
    useTestComboUpdateByIdMutation()
  const [deleteTestCombo, { isLoading: isDeleting }] =
    useTestComboDeleteByIdMutation()

  const [selectedCombo, setSelectedCombo] =
    React.useState<TestComboResponseDto | null>(null)

  return data?.items != undefined ? (
    <>
      <CrudTable
        items={data?.items}
        itemIdField="_id"
        isLoading={isFetching || isCreating || isUpdating || isDeleting}
        fieldColumns={testComboColumns}
        rowCount={data?.total!}
        page={data?.offset!}
        pageSize={data?.limit!}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onItemCreate={async (item) => {
          await createTestCombo({
            name: item.name,
            displayIndex: item.displayIndex,
            testIds: [],
            branchId,
          }).unwrap()
        }}
        onItemUpdate={async (newItem) => {
          await updateTestCombo({
            id: newItem._id,
            testComboUpdateRequestDto: {
              name: newItem.name,
              displayIndex: newItem.displayIndex,
            },
          }).unwrap()
        }}
        onItemDelete={async (item) => {
          await deleteTestCombo(item._id).unwrap()
        }}
        onRefresh={async () => {
          await searchTestCombos(filterObj).unwrap()
        }}
        customRowActions={[
          {
            label: 'Chọn XN',
            action: (combo) => {
              setSelectedCombo(combo)
            },
          },
        ]}
      />
      <TestSelector
        open={selectedCombo != null}
        previousState={selectedCombo?.testIds ?? []}
        onClose={() => {
          setSelectedCombo(null)
        }}
        onSubmit={(tests) => {
          updateTestCombo({
            id: selectedCombo?._id!,
            testComboUpdateRequestDto: {
              testIds: tests.map(({ _id }) => _id),
            },
          })
        }}
      />
    </>
  ) : (
    <Skeleton variant="rectangular" width="100%" height="100%" />
  )
}
