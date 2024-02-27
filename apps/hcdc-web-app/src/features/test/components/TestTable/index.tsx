import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from '@mui/material'
import { useLoaderData, useRevalidator } from 'react-router-dom'
import { useState } from 'react'

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
import { manageTestPageLoader } from '../../pages/ManageTestPage/loader'
import { useTestColumns } from './columns'
import { authSlice } from 'src/features/auth'
import { useTypedSelector } from 'src/infra/redux'
import { SideAction } from 'src/components/ui'
import { BioProductTable } from 'src/features/bio-product'

const ALL_CATEGORIES = 'ALL_CATEGORIES'

export function TestTable() {
  const revalidator = useRevalidator()
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const { testCategories, bioProducts, printForms } =
    useLoaderData() as Awaited<ReturnType<typeof manageTestPageLoader>>

  const columns = useTestColumns(testCategories, bioProducts, printForms)

  const { filterObj, setFilterObj, onPageChange, onPageSizeChange } =
    useCrudPagination({
      sort: { index: 1 },
      filter: { branchId },
      offset: 0,
    })

  const { data, isFetching } = useTestSearchQuery(filterObj)
  const [searchTests] = useLazyTestSearchQuery()

  const [createTest, { isLoading: isCreating }] = useTestCreateMutation()
  const [updateTest, { isLoading: isUpdating }] = useTestUpdateByIdMutation()
  const [deleteTest, { isLoading: isDeleting }] = useTestDeleteByIdMutation()

  const [bioProductTest, setBioProductTest] = useState<TestResponseDto | null>(
    null,
  )

  return data?.items != undefined ? (
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
            testCategoryId: item.testCategoryId,
            bioProductId: item.bioProductId ?? null,
            printFormId: item.printFormId ?? null,
            instrumentId: null,
            sampleTypeId: null,
            shouldDisplayWithChildren: item.shouldDisplayWithChildren ?? false,
            branchId,
          }).unwrap()
        }}
        onItemUpdate={async (newItem) => {
          await updateTest({
            id: newItem._id,
            testUpdateRequestDto: {
              name: newItem.name,
              displayIndex: newItem.displayIndex,
              testCategoryId: newItem.testCategoryId,
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
        TopRightComponent={
          <FormControl fullWidth size="small" sx={{ minWidth: '300px' }}>
            <InputLabel>Nhóm xét nghiệm</InputLabel>
            <Select
              color="secondary"
              defaultOpen
              label="Nhóm xét nghiệm"
              defaultValue={ALL_CATEGORIES}
              onChange={({ target }) => {
                const categoryId = target?.value
                if (categoryId !== ALL_CATEGORIES) {
                  setFilterObj((filterObj) => ({
                    ...filterObj,
                    offset: 0,
                    filter: {
                      ...filterObj.filter,
                      testCategoryId: categoryId,
                    },
                  }))
                } else {
                  setFilterObj((filterObj) => ({
                    ...filterObj,
                    offset: 0,
                    filter: {
                      ...filterObj.filter,
                      testCategoryId: undefined,
                    },
                  }))
                }
              }}
            >
              <MenuItem value={ALL_CATEGORIES}>Tất cả</MenuItem>
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
          revalidator.revalidate()
        }}
        title={bioProductTest?.name!}
        disableClickOutside={false}
      >
        <BioProductTable testId={bioProductTest?._id!} />
      </SideAction>
    </>
  ) : (
    <Skeleton variant="rectangular" width="100%" height="100%" />
  )
}
