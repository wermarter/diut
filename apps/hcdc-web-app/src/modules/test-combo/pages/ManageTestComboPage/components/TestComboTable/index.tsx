import * as React from 'react'
import { Skeleton } from '@mui/material'

import {
  useTestComboCreateMutation,
  useTestComboDeleteByIdMutation,
  useTestComboSearchQuery,
  useTestComboUpdateByIdMutation,
  useLazyTestComboSearchQuery,
  TestComboResponseDto,
} from 'src/api/test-combo'
import { CrudTable } from 'src/common/components/CrudTable'
import { useCrudPagination } from 'src/common/hooks'
import { testComboColumns } from './columns'
import { TestSelector } from 'src/common/components/TestSelector'

export function TestComboTable() {
  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination({
    sort: { index: 1 },
    offset: 0,
  })

  const { data, isFetching } = useTestComboSearchQuery({
    searchTestComboRequestDto: filterObj,
  })
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
            createTestComboRequestDto: {
              name: item.name,
              index: item.index,
              children: [],
            },
          }).unwrap()
        }}
        onItemUpdate={async (newItem, oldItem) => {
          await updateTestCombo({
            id: newItem._id,
            updateTestComboRequestDto: {
              name: newItem.name,
              index: newItem.index,
            },
          }).unwrap()
        }}
        onItemDelete={async (item) => {
          await deleteTestCombo({
            id: item._id,
          }).unwrap()
        }}
        onRefresh={async () => {
          await searchTestCombos({
            searchTestComboRequestDto: filterObj,
          }).unwrap()
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
        previousState={selectedCombo?.children ?? []}
        onClose={() => {
          setSelectedCombo(null)
        }}
        onSubmit={(tests) => {
          updateTestCombo({
            id: selectedCombo?._id!,
            updateTestComboRequestDto: {
              children: tests.map(({ _id }) => _id),
            },
          })
        }}
      />
    </>
  ) : (
    <Skeleton variant="rectangular" width="100%" height="100%" />
  )
}
