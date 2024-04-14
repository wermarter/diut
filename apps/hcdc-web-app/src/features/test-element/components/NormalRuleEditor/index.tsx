import { Box } from '@mui/material'
import { useCallback, useEffect } from 'react'
import { PatientCategory } from '@diut/hcdc'

import {
  TestElementNormalRuleDto,
  useLazyTestElementFindByIdQuery,
  useTestElementFindByIdQuery,
  useTestElementUpdateByIdMutation,
} from 'src/infra/api/access-service/test-element'
import { CrudTable } from 'src/components/table'
import { SideAction } from 'src/components/ui/SideAction'
import { normalRuleColumns } from './columns'

type NormalRuleEditorProps = {
  testElementId: string | null
  onClose: Function
}

export function NormalRuleEditor(props: NormalRuleEditorProps) {
  const { data: testElement, isFetching } = useTestElementFindByIdQuery(
    props.testElementId!,
    {
      skip: props.testElementId === null,
    },
  )
  const [refetch] = useLazyTestElementFindByIdQuery()
  useEffect(() => {
    if (props.testElementId) {
      refetch(props.testElementId)
    }
  }, [props.testElementId])

  const [updateTestElement, { isLoading: isUpdating }] =
    useTestElementUpdateByIdMutation()

  const isLoading = isFetching || isUpdating

  const createNormalRule = useCallback(
    async (rule: TestElementNormalRuleDto) => {
      if (testElement) {
        await updateTestElement({
          id: testElement._id!,
          testElementUpdateRequestDto: {
            normalRules: [
              ...testElement.normalRules.filter(
                ({ category }) => category !== rule.category,
              ),
              rule,
            ],
          },
        })
      }
    },
    [testElement],
  )

  const updateNormalRule = useCallback(
    async (
      newRule: TestElementNormalRuleDto,
      oldRule: TestElementNormalRuleDto,
    ) => {
      if (testElement) {
        await updateTestElement({
          id: testElement._id!,
          testElementUpdateRequestDto: {
            normalRules: testElement.normalRules.map((rule) => {
              if (rule.category === oldRule.category) {
                return newRule
              } else {
                return rule
              }
            }),
          },
        })
      }
    },
    [testElement],
  )

  const removeNormalRule = useCallback(
    async (rule: TestElementNormalRuleDto) => {
      if (testElement) {
        await updateTestElement({
          id: testElement._id!,
          testElementUpdateRequestDto: {
            normalRules: testElement.normalRules.filter(
              ({ category }) => category !== rule.category,
            ),
          },
        })
      }
    },
    [testElement],
  )

  return (
    <SideAction
      fullWidth
      open={props.testElementId !== null}
      onClose={props.onClose}
      title={`Tham chiếu: ${testElement?.name}`}
      disableClickOutside={isLoading}
    >
      <Box sx={{ p: 2, height: '100%' }}>
        <CrudTable
          items={testElement?.normalRules}
          isLoading={isLoading}
          itemIdField="category"
          newItemId={PatientCategory.Any}
          fieldColumns={normalRuleColumns}
          onRefresh={() => {
            if (props.testElementId) {
              refetch(props.testElementId)
            }
          }}
          onItemCreate={createNormalRule}
          onItemUpdate={updateNormalRule}
          onItemDelete={removeNormalRule}
        />
      </Box>
    </SideAction>
  )
}
