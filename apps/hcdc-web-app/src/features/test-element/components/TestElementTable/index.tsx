import { FormControl } from '@mui/material'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  useTestElementCreateMutation,
  useTestElementDeleteByIdMutation,
  useTestElementSearchQuery,
  useTestElementUpdateByIdMutation,
  useLazyTestElementSearchQuery,
  TestElementResponseDto,
} from 'src/infra/api/access-service/test-element'
import { CrudTable } from 'src/components/table'
import { useCrudPagination } from 'src/shared/hooks'
import { testElementColumns } from './columns'
import { TestResponseDto } from 'src/infra/api/access-service/test'
import { NormalRuleEditor } from '../NormalRuleEditor'
import { useTypedSelector } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'
import { FormAutocomplete, FormContainer } from 'src/components/form'

type TestElementTableProps = {
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  tests: TestResponseDto[]
  testId: string
  setTestId: (id: string) => void
}

type FormData = {
  testId: string
}

export function TestElementTable(props: TestElementTableProps) {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const { filterObj, setFilterObj, onPageChange, onPageSizeChange } =
    useCrudPagination(
      {
        offset: props.page,
        limit: props.pageSize,
        sort: { displayIndex: 1 },
        filter: { branchId, testId: props.testId },
      },
      props.setPage,
      props.setPageSize,
    )

  const [ruleRow, setRuleRow] = useState<TestElementResponseDto | null>(null)

  const { control, watch, setValue } = useForm<FormData>({
    defaultValues: {
      testId: props.testId,
    },
  })
  const selectedTestId = watch('testId')

  useEffect(() => {
    if (props.testId) {
      setValue('testId', props.testId)
      props.setPage(0)
      setFilterObj((prev) => ({
        ...prev,
        offset: 0,
        filter: { ...prev.filter, testId: props.testId },
      }))
    }
  }, [props.testId])

  useEffect(() => {
    if (selectedTestId) {
      props.setTestId(selectedTestId)
    }
  }, [selectedTestId])

  const { data, isFetching } = useTestElementSearchQuery(filterObj)
  const [searchTestElements] = useLazyTestElementSearchQuery()

  const [createTestElement, { isLoading: isCreating }] =
    useTestElementCreateMutation()
  const [updateTestElement, { isLoading: isUpdating }] =
    useTestElementUpdateByIdMutation()
  const [deleteTestElement, { isLoading: isDeleting }] =
    useTestElementDeleteByIdMutation()

  return (
    <>
      <CrudTable
        items={data?.items}
        itemIdField="_id"
        isLoading={isFetching || isCreating || isUpdating || isDeleting}
        fieldColumns={testElementColumns}
        rowCount={data?.total!}
        page={data?.offset!}
        pageSize={data?.limit!}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onItemCreate={async (item) => {
          await createTestElement({
            name: item.name,
            displayIndex: item.displayIndex,
            printIndex: item.printIndex,
            reportIndex: item.reportIndex,
            isParent: item.isParent,
            unit: item.unit,
            normalRules: [],
            testId: props.testId,
            branchId,
          }).unwrap()
        }}
        onItemUpdate={async (newItem) => {
          await updateTestElement({
            id: newItem._id,
            testElementUpdateRequestDto: {
              name: newItem.name,
              displayIndex: newItem.displayIndex,
              printIndex: newItem.printIndex,
              reportIndex: newItem.reportIndex,
              isParent: newItem.isParent,
              unit: newItem.unit,
            },
          }).unwrap()
        }}
        onItemDelete={async (item) => {
          await deleteTestElement(item._id).unwrap()
        }}
        onRefresh={async () => {
          await searchTestElements(filterObj).unwrap()
        }}
        TopLeftComponent={
          <FormControl
            color="secondary"
            focused
            fullWidth
            size="small"
            sx={{ minWidth: '300px' }}
          >
            <FormContainer
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <FormAutocomplete
                label="Chọn XN"
                control={control}
                name="testId"
                options={props.tests}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option._id}
                groupBy={(option) => option.testCategory?.name ?? ''}
              />
            </FormContainer>
          </FormControl>
        }
        customRowActions={[
          {
            label: 'Tham chiếu',
            action: (testElement) => {
              setRuleRow(testElement)
            },
          },
        ]}
      />
      <NormalRuleEditor
        element={ruleRow}
        onClose={() => {
          setRuleRow(null)
        }}
        onSubmit={(normalRules) => {
          updateTestElement({
            id: ruleRow?._id!,
            testElementUpdateRequestDto: { normalRules },
          }).then(() => {
            toast.success('Đặt tham chiếu thành công.')
          })
        }}
        isSubmitting={isUpdating}
      />
    </>
  )
}
