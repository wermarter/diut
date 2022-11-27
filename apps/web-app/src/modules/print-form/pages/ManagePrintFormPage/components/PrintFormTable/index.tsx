import { Skeleton } from '@mui/material'

import {
  usePrintFormSearchQuery,
  usePrintFormUpdateByIdMutation,
  useLazyPrintFormSearchQuery,
} from 'src/api/print-form'
import { CrudTable } from 'src/common/components/CrudTable'
import { useCrudPagination } from 'src/common/hooks'
import { printFormColumns } from './columns'

export function PrintFormTable() {
  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination({
    sort: { index: 1 },
    offset: 0,
  })

  const { data, isFetching } = usePrintFormSearchQuery({
    searchPrintFormRequestDto: filterObj,
  })
  const [searchPrintForms] = useLazyPrintFormSearchQuery()

  const [updatePrintForm, { isLoading: isUpdating }] =
    usePrintFormUpdateByIdMutation()

  return data?.items !== undefined ? (
    <CrudTable
      items={data?.items}
      itemIdField="_id"
      isLoading={isFetching || isUpdating}
      fieldColumns={printFormColumns}
      rowCount={data?.total!}
      page={data?.offset!}
      pageSize={data?.limit!}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      onItemUpdate={async (newItem, oldItem) => {
        await updatePrintForm({
          id: newItem._id,
          updatePrintFormRequestDto: {
            name: newItem.name,
            index: newItem.index,
            isAuthorLocked: newItem.isAuthorLocked,
            authorPosition: newItem.authorPosition,
            authorName: newItem.authorName,
            titleMargin: newItem.titleMargin,
          },
        }).unwrap()
      }}
      onRefresh={async () => {
        await searchPrintForms({
          searchPrintFormRequestDto: filterObj,
        }).unwrap()
      }}
    />
  ) : (
    <Skeleton variant="rounded" width="100%" height="400px" />
  )
}
