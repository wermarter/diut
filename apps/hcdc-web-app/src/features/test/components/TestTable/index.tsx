import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { CrudTable } from 'src/components/table'
import { AutocompleteDialog, SideAction } from 'src/components/ui'
import { authSlice } from 'src/features/auth'
import { BioProductTable } from 'src/features/bio-product'
import { InstrumentTable } from 'src/features/instrument'
import { BioProductResponseDto } from 'src/infra/api/access-service/bio-product'
import { InstrumentResponseDto } from 'src/infra/api/access-service/instrument'
import { PrintFormResponseDto } from 'src/infra/api/access-service/print-form'
import { SampleTypeResponseDto } from 'src/infra/api/access-service/sample-type'
import {
  TestResponseDto,
  TestSearchRequestDto,
  useLazyTestSearchQuery,
  useTestCreateMutation,
  useTestDeleteByIdMutation,
  useTestSearchQuery,
  useTestUpdateByIdMutation,
} from 'src/infra/api/access-service/test'
import { TestCategoryResponseDto } from 'src/infra/api/access-service/test-category'
import { useTypedSelector } from 'src/infra/redux'
import { usePagination } from 'src/shared/hooks'
import { useTestColumns } from './columns'
import { ImportTestDialog } from '../ImportTestDialog'

type TestTableProps = {
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  testCategories: TestCategoryResponseDto[]
  bioProducts: BioProductResponseDto[]
  instruments: InstrumentResponseDto[]
  sampleTypes: SampleTypeResponseDto[]
  printForms: PrintFormResponseDto[]
  printFormMap: Map<string, PrintFormResponseDto>
  revalidateCallback: () => void
  testCategoryId: string
  setTestCategoryId: (id: string) => void
}

export function TestTable(props: TestTableProps) {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const columns = useTestColumns(
    props.bioProducts,
    props.instruments,
    props.sampleTypes,
    props.printFormMap,
  )

  const { filterObj, setFilterObj } = usePagination<TestSearchRequestDto>({
    offset: props.page,
    limit: props.pageSize,
    sort: { displayIndex: 1 },
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

  useEffect(() => {
    setFilterObj((prev) => ({
      ...prev,
      filter: { ...prev.filter, testCategoryId: props.testCategoryId },
    }))
  }, [props.testCategoryId])

  const isFirstRun = useRef(true)
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
  }, [])

  const { data, isFetching } = useTestSearchQuery(filterObj, {
    skip: isFirstRun.current,
  })
  const [searchTests] = useLazyTestSearchQuery()

  const [createTest, { isLoading: isCreating }] = useTestCreateMutation()
  const [updateTest, { isLoading: isUpdating }] = useTestUpdateByIdMutation()
  const [deleteTest, { isLoading: isDeleting }] = useTestDeleteByIdMutation()

  const [bioProductTest, setBioProductTest] = useState<TestResponseDto | null>(
    null,
  )
  const [instrumentTest, setInstrumentTest] = useState<TestResponseDto | null>(
    null,
  )
  const [printFormTest, setPrintFormTest] = useState<TestResponseDto | null>(
    null,
  )
  const [isImportOpen, setIsImportOpen] = useState(false)

  return (
    <>
      <CrudTable
        items={data?.items}
        itemIdField="_id"
        isLoading={isFetching || isCreating || isUpdating || isDeleting}
        fieldColumns={columns}
        rowCount={data?.total ?? 0}
        page={data?.offset!}
        pageSize={data?.limit!}
        onPageChange={props.setPage}
        onPageSizeChange={props.setPageSize}
        onItemCreate={async (item) => {
          await createTest({
            name: item.name,
            displayIndex: item.displayIndex,
            bioProductId: item.bioProductId ?? null,
            printFormIds: [],
            instrumentId: item.instrumentId ?? null,
            sampleTypeId: item.sampleTypeId ?? null,
            shouldDisplayWithChildren: item.shouldDisplayWithChildren ?? false,
            testCategoryId: props.testCategoryId!,
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
              instrumentId: newItem.instrumentId,
              sampleTypeId: newItem.sampleTypeId,
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
          {
            label: 'Máy XN',
            action(test) {
              setInstrumentTest(test)
            },
          },
          {
            label: 'Form in',
            action(test) {
              setPrintFormTest(test)
            },
          },
        ]}
        TopRightComponent={
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setIsImportOpen(true)}
          >
            nhập XN
          </Button>
        }
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
              value={props.testCategoryId}
              onChange={({ target }) => {
                const categoryId = target?.value
                if (categoryId) {
                  props.setPage(0)
                  props.setTestCategoryId(categoryId)
                }
              }}
            >
              {props.testCategories.map((category) => (
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
          props.revalidateCallback()
        }}
        title={`Sinh phẩm: ${bioProductTest?.name!}`}
        disableClickOutside={false}
      >
        <BioProductTable testId={bioProductTest?._id!} />
      </SideAction>
      <SideAction
        fullWidth
        open={instrumentTest !== null}
        onClose={() => {
          setInstrumentTest(null)
          props.revalidateCallback()
        }}
        title={`Máy XN: ${instrumentTest?.name!}`}
        disableClickOutside={false}
      >
        <InstrumentTable testId={instrumentTest?._id!} />
      </SideAction>
      <AutocompleteDialog
        title={printFormTest?.name!}
        open={printFormTest !== null}
        onClose={() => {
          setPrintFormTest(null)
          props.revalidateCallback()
        }}
        selectedOptionValues={printFormTest?.printFormIds!}
        onSubmit={(selectedPrintFormIds) => {
          updateTest({
            id: printFormTest?._id!,
            testUpdateRequestDto: {
              printFormIds: selectedPrintFormIds,
            },
          })
        }}
        fullWidth
        maxWidth="sm"
        contentText="Form đầu tiên quyết hình thức nhập KQ"
        FormAutocompleteProps={{
          preserveInputOrder: true,
          size: 'medium',
          label: 'Form in',
          options: props.printForms,
          getOptionValue(option) {
            return option._id
          },
          getOptionLabel(option) {
            return option.name
          },
        }}
      />
      <ImportTestDialog
        open={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        currentBranchId={branchId}
        currentTestCategoryId={props.testCategoryId}
        revalidateCallback={props.revalidateCallback}
      />
    </>
  )
}
