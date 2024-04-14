import { useEffect, useState } from 'react'

import {
  useTestComboCreateMutation,
  useTestComboDeleteByIdMutation,
  useTestComboSearchQuery,
  useTestComboUpdateByIdMutation,
  useLazyTestComboSearchQuery,
  TestComboResponseDto,
} from 'src/infra/api/access-service/test-combo'
import { CrudTable } from 'src/components/table'
import { usePagination } from 'src/shared/hooks'
import { testComboColumns } from './columns'
import { TestSelector } from 'src/features/test'
import { authSlice } from 'src/features/auth'
import { useTypedSelector } from 'src/infra/redux'

type TestComboTableProps = {
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
}

export function TestComboTable(props: TestComboTableProps) {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const { filterObj, setFilterObj } = usePagination({
    offset: props.page,
    limit: props.pageSize,
    sort: { displayIndex: 1 },
    filter: { branchId },
  })

  useEffect(() => {
    if (branchId) {
      setFilterObj((prev) => ({
        ...prev,
        filter: {
          ...filterObj.filter,
          branchId,
        },
      }))
    }
  }, [branchId])

  const { data, isFetching } = useTestComboSearchQuery(filterObj)
  const [searchTestCombos] = useLazyTestComboSearchQuery()

  const [createTestCombo, { isLoading: isCreating }] =
    useTestComboCreateMutation()
  const [updateTestCombo, { isLoading: isUpdating }] =
    useTestComboUpdateByIdMutation()
  const [deleteTestCombo, { isLoading: isDeleting }] =
    useTestComboDeleteByIdMutation()

  const [selectedCombo, setSelectedCombo] =
    useState<TestComboResponseDto | null>(null)

  return (
    <>
      <CrudTable
        items={data?.items}
        itemIdField="_id"
        isLoading={isFetching || isCreating || isUpdating || isDeleting}
        fieldColumns={testComboColumns}
        rowCount={data?.total ?? 0}
        page={data?.offset!}
        pageSize={data?.limit!}
        onPageChange={props.setPage}
        onPageSizeChange={props.setPageSize}
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
  )
}
