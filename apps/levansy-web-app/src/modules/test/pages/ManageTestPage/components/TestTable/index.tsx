import { PrintForm } from '@diut/levansy-common'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from '@mui/material'
import { useLoaderData } from 'react-router-dom'

import { BioProductResponseDto } from 'src/api/bio-product'
import {
  useTestCreateMutation,
  useTestDeleteByIdMutation,
  useTestSearchQuery,
  useTestUpdateByIdMutation,
  useLazyTestSearchQuery,
} from 'src/api/test'
import { CrudTable } from 'src/common/components/CrudTable'
import { useCrudPagination } from 'src/common/hooks'
import { manageTestPageLoader } from '../../loader'
import { NO_BIOPRODUCT, useTestColumns } from './columns'

const ALL_CATEGORIES = 'ALL_CATEGORIES'

function setBioProductId(
  bioProducts: BioProductResponseDto[],
  bioProductId: string,
) {
  if (bioProductId === NO_BIOPRODUCT) {
    return null
  }
  return bioProducts.find(
    (bioProduct) => bioProduct.name === (bioProductId as any),
  )?._id!
}

export function TestTable() {
  const { testCategories, bioProducts, printForms } =
    useLoaderData() as Awaited<ReturnType<typeof manageTestPageLoader>>

  const columns = useTestColumns(testCategories, bioProducts, printForms)

  const { filterObj, setFilterObj, onPageChange, onPageSizeChange } =
    useCrudPagination({
      sort: { index: 1 },
      offset: 0,
    })

  const { data, isFetching } = useTestSearchQuery({
    searchTestRequestDto: filterObj,
  })
  const [searchTests] = useLazyTestSearchQuery()

  const [createTest, { isLoading: isCreating }] = useTestCreateMutation()
  const [updateTest, { isLoading: isUpdating }] = useTestUpdateByIdMutation()
  const [deleteTest, { isLoading: isDeleting }] = useTestDeleteByIdMutation()

  return data?.items !== undefined ? (
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
          createTestRequestDto: {
            name: item.name,
            index: item.index,
            category: testCategories.find(
              (category) => category.name === (item.category as any),
            )?._id!,
            bioProduct: setBioProductId(bioProducts, item.bioProduct as any)!,
            printForm: printForms.find(
              (printForm) => printForm.name === item.printForm,
            )?._id! as PrintForm,
            shouldNotPrint: item.shouldNotPrint ?? false,
            shouldDisplayWithChildren: item.shouldDisplayWithChildren ?? false,
          },
        }).unwrap()
      }}
      onItemUpdate={async (newItem, oldItem) => {
        await updateTest({
          id: newItem._id,
          updateTestRequestDto: {
            name: newItem.name,
            index: newItem.index,
            category: testCategories.find(
              (category) => category.name === (newItem.category as any),
            )?._id,
            bioProduct: setBioProductId(
              bioProducts,
              newItem.bioProduct as any,
            )!,
            printForm: printForms.find(
              (printForm) => printForm.name === newItem.printForm,
            )?._id! as PrintForm,
            shouldNotPrint: newItem.shouldNotPrint ?? false,
            shouldDisplayWithChildren:
              newItem.shouldDisplayWithChildren ?? false,
          },
        }).unwrap()
      }}
      onItemDelete={async (item) => {
        await deleteTest({
          id: item._id,
        }).unwrap()
      }}
      onRefresh={async () => {
        await searchTests({
          searchTestRequestDto: filterObj,
        }).unwrap()
      }}
      TopRightComponent={
        <FormControl fullWidth size="small" sx={{ minWidth: '300px' }}>
          <InputLabel>Nhóm xét nghiệm</InputLabel>
          <Select
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
                    category: categoryId,
                  },
                }))
              } else {
                setFilterObj((filterObj) => ({
                  ...filterObj,
                  offset: 0,
                  filter: {
                    ...filterObj.filter,
                    category: undefined,
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
  ) : (
    <Skeleton variant="rectangular" width="100%" height="100%" />
  )
}
