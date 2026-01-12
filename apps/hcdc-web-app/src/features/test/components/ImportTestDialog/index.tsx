import { Box } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FormAutocomplete, FormSelect } from 'src/components/form'
import { ConfirmDialog } from 'src/components/ui'
import { authSlice } from 'src/features/auth'
import {
  useLazyTestSearchQuery,
  useTestCreateMutation,
  TestResponseDto,
} from 'src/infra/api/access-service/test'
import {
  useLazyTestElementSearchQuery,
  useTestElementCreateMutation,
} from 'src/infra/api/access-service/test-element'
import { useTypedSelector } from 'src/infra/redux'

export type ImportTestDialogProps = {
  open: boolean
  onClose: () => void
  currentBranchId: string
  currentTestCategoryId: string
  revalidateCallback: () => void
}

type FormValues = {
  sourceBranchId: string
  testIds: string[]
}

export function ImportTestDialog({
  open,
  onClose,
  currentBranchId,
  currentTestCategoryId,
  revalidateCallback,
}: ImportTestDialogProps) {
  const branches = useTypedSelector(authSlice.selectors.selectBranches) ?? []
  const availableBranches = branches.filter((b) => b._id !== currentBranchId)

  const { control, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      sourceBranchId: '',
      testIds: [],
    },
  })

  const sourceBranchId = watch('sourceBranchId')
  const [fetchTests, { data: testData }] = useLazyTestSearchQuery()
  const [createTest] = useTestCreateMutation()
  const [fetchElements] = useLazyTestElementSearchQuery()
  const [createTestElement] = useTestElementCreateMutation()

  useEffect(() => {
    if (sourceBranchId) {
      fetchTests({
        filter: { branchId: sourceBranchId },
        limit: 1000,
        sort: { displayIndex: 1 },
      })
      setValue('testIds', [])
    }
  }, [sourceBranchId, fetchTests, setValue])

  const onSubmit = async (values: FormValues) => {
    const selectedTests =
      testData?.items.filter((t) => values.testIds.includes(t._id)) ?? []

    for (const test of selectedTests) {
      const newTest = await createTest({
        name: test.name,
        displayIndex: test.displayIndex,
        shouldDisplayWithChildren: test.shouldDisplayWithChildren,
        testCategoryId: currentTestCategoryId,
        branchId: currentBranchId,
        bioProductId: null,
        instrumentId: null,
        sampleTypeId: test.sampleTypeId,
        printFormIds: [],
      }).unwrap()

      const { items: elements } = await fetchElements({
        filter: { testId: test._id },
        limit: 1000,
        sort: { displayIndex: 1 },
      }).unwrap()

      for (const element of elements) {
        await createTestElement({
          name: element.name,
          displayIndex: element.displayIndex,
          printIndex: element.printIndex,
          reportIndex: element.reportIndex,
          unit: element.unit,
          isParent: element.isParent,
          normalRules: element.normalRules,
          testId: newTest._id,
          branchId: currentBranchId,
        }).unwrap()
      }
    }

    revalidateCallback()
  }

  return (
    <ConfirmDialog
      title="Nhập xét nghiệm từ chi nhánh khác"
      open={open}
      onClose={onClose}
      onConfirm={handleSubmit(onSubmit)}
      fullWidth
      maxWidth="sm"
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <FormSelect
          control={control}
          name="sourceBranchId"
          label="Chi nhánh nguồn"
          options={availableBranches}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option._id}
        />
        <FormAutocomplete
          control={control}
          name="testIds"
          label="Xét nghiệm"
          options={testData?.items ?? []}
          getOptionLabel={(option: TestResponseDto) => option.name}
          getOptionValue={(option: TestResponseDto) => option._id}
          multiple
          size="medium"
        />
      </Box>
    </ConfirmDialog>
  )
}
