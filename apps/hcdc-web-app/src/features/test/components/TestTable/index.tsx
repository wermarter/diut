import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useEffect, useState } from 'react'

import {
  useTestCreateMutation,
  useTestDeleteByIdMutation,
  useTestSearchQuery,
  useTestUpdateByIdMutation,
  useLazyTestSearchQuery,
  TestResponseDto,
} from 'src/infra/api/access-service/test'
import { CrudTable } from 'src/components/table'
import { useCrudPagination } from 'src/shared/hooks'
import { useTestColumns } from './columns'
import { authSlice } from 'src/features/auth'
import { useTypedSelector } from 'src/infra/redux'
import { SideAction } from 'src/components/ui'
import { BioProductTable } from 'src/features/bio-product'
import { TestCategoryResponseDto } from 'src/infra/api/access-service/test-category'
import { BioProductResponseDto } from 'src/infra/api/access-service/bio-product'
import { PrintFormResponseDto } from 'src/infra/api/access-service/print-form'

type TestTableProps = {
  testCategories: TestCategoryResponseDto[]
  bioProducts: BioProductResponseDto[]
  printForms: PrintFormResponseDto[]
  revalidateCallback: () => void
  testCategoryId: string
  setTestCategoryId: (id: string) => void
}

export function TestTable({
  testCategories,
  bioProducts,
  printForms,
  revalidateCallback,
  testCategoryId,
  setTestCategoryId,
}: TestTableProps) {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const columns = useTestColumns(bioProducts, printForms)

  const { filterObj, setFilterObj, onPageChange, onPageSizeChange } =
    useCrudPagination({
      sort: { index: 1 },
      filter: {
        branchId,
        testCategoryId,
      },
      offset: 0,
    })

  useEffect(() => {
    if (testCategoryId) {
      setFilterObj((prev) => ({
        ...prev,
        filter: { ...prev.filter, testCategoryId },
      }))
    }
  }, [testCategoryId])

  const { data, isFetching } = useTestSearchQuery(filterObj)
  const [searchTests] = useLazyTestSearchQuery()

  const [createTest, { isLoading: isCreating }] = useTestCreateMutation()
  const [updateTest, { isLoading: isUpdating }] = useTestUpdateByIdMutation()
  const [deleteTest, { isLoading: isDeleting }] = useTestDeleteByIdMutation()

  const [bioProductTest, setBioProductTest] = useState<TestResponseDto | null>(
    null,
  )

  return (
    <>
      <CrudTable
        items={data?.items}
        itemIdField="_id"
        isLoading={isFetching || isCreating || isUpdating || isDeleting}
        fieldColumns={columns}
        rowCount={data?.total!}
        page={data?.offset!}
        pageSize={data?.limit!}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onItemCreate={async (item) => {
          await createTest({
            name: item.name,
            displayIndex: item.displayIndex,
            bioProductId: item.bioProductId ?? null,
            printFormId: item.printFormId ?? null,
            instrumentId: null,
            sampleTypeId: null,
            shouldDisplayWithChildren: item.shouldDisplayWithChildren ?? false,
            testCategoryId,
            branchId,
          }).unwrap()
        }}
        onItemUpdate={async (newItem) => {
          await updateTest({
            id: newItem._id,
            testUpdateRequestDto: {
              name: newItem.name,
              displayIndex: newItem.displayIndex,
              bioProductId: newItem.bioProductId,
              printFormId: newItem.printFormId,
              shouldDisplayWithChildren: newItem.shouldDisplayWithChildren,
            },
          }).unwrap()
        }}
        onItemDelete={async (item) => {
          await deleteTest(item._id).unwrap()
        }}
        onRefresh={async () => {
          await searchTests(filterObj).unwrap()
        }}
        customRowActions={[
          {
            label: 'Sinh phẩm',
            action(test) {
              setBioProductTest(test)
            },
          },
        ]}
        TopLeftComponent={
          <FormControl
            color="secondary"
            focused
            fullWidth
            size="small"
            sx={{ minWidth: '300px' }}
          >
            <InputLabel>Nhóm xét nghiệm</InputLabel>
            <Select
              label="Nhóm xét nghiệm"
              value={testCategoryId}
              onChange={({ target }) => {
                const categoryId = target?.value
                setTestCategoryId(categoryId)
              }}
            >
              {testCategories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        }
      />
      <SideAction
        fullWidth
        open={bioProductTest !== null}
        onClose={() => {
          setBioProductTest(null)
          revalidateCallback()
        }}
        title={bioProductTest?.name!}
        disableClickOutside={false}
      >
        <BioProductTable testId={bioProductTest?._id!} />
      </SideAction>
    </>
  )
}
