import { Skeleton } from '@mui/material'

import {
  usePrintFormSearchQuery,
  usePrintFormUpdateByIdMutation,
  useLazyPrintFormSearchQuery,
} from 'src/infra/api/access-service/print-form'
import { CrudTable } from 'src/components/table'
import { useCrudPagination } from 'src/shared/hooks'
import { printFormColumns } from './columns'
import { authSlice } from 'src/features/auth'
import { useTypedSelector } from 'src/infra/redux'

export function PrintFormTable() {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination({
    sort: { displayIndex: 1 },
    offset: 0,
  })

  const { data, isFetching } = usePrintFormSearchQuery(filterObj)
  const [searchPrintForms] = useLazyPrintFormSearchQuery()

  const [updatePrintForm, { isLoading: isUpdating }] =
    usePrintFormUpdateByIdMutation()

  return data?.items != undefined ? (
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
      onItemUpdate={async (newItem) => {
        await updatePrintForm({
          id: newItem._id,
          printFormUpdateRequestDto: {
            name: newItem.name,
            displayIndex: newItem.displayIndex,
            isAuthorLocked: newItem.isAuthorLocked,
            authorTitle: newItem.authorTitle,
            authorName: newItem.authorName,
            titleMargin: newItem.titleMargin,
          },
        }).unwrap()
      }}
      onRefresh={async () => {
        await searchPrintForms(filterObj).unwrap()
      }}
    />
  ) : (
    <Skeleton variant="rectangular" width="100%" height="100%" />
  )
}
