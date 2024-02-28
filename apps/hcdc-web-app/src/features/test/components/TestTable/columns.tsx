import { GridColDef } from '@mui/x-data-grid'
import { useMemo } from 'react'

import { BioProductResponseDto } from 'src/infra/api/access-service/bio-product'
import { PrintFormResponseDto } from 'src/infra/api/access-service/print-form'
import { TestResponseDto } from 'src/infra/api/access-service/test'

export function useTestColumns(
  bioProducts: BioProductResponseDto[],
  printForms: PrintFormResponseDto[],
): GridColDef<TestResponseDto>[] {
  const bioProductLookup = useMemo(() => {
    const bioProductMap: Record<string, BioProductResponseDto[]> = {}
    bioProducts.forEach((item) => {
      if (bioProductMap[item.testId] === undefined) {
        bioProductMap[item.testId] = []
      }
      bioProductMap[item.testId].push(item)
    })

    const rv: Record<string, { label: string; value: string | null }[]> = {}

    for (const testId in bioProductMap) {
      rv[testId] = bioProductMap[testId]
        .map((item) => ({
          value: item._id,
          label: item.name,
        }))
        .concat([{ label: '-- không --', value: null as unknown as string }])
    }

    return rv
  }, [bioProducts])

  return [
    {
      field: 'displayIndex',
      headerName: 'Thứ tự',
      type: 'number',
      width: 70,
      sortable: false,
      editable: true,
    },
    {
      field: 'name',
      headerName: 'Tên xét nghiệm',
      minWidth: 200,
      flex: 1,
      sortable: false,
      editable: true,
    },
    {
      field: 'bioProductId',
      headerName: 'Sinh phẩm',
      type: 'singleSelect',
      width: 200,
      sortable: false,
      editable: true,
      valueOptions(params) {
        return bioProductLookup?.[params.row?._id!]
      },
    },
    {
      field: 'shouldDisplayWithChildren',
      type: 'boolean',
      headerName: 'Luôn hiện',
      width: 100,
      sortable: false,
      editable: true,
    },
    {
      field: 'printFormId',
      type: 'singleSelect',
      headerName: 'Form In',
      width: 120,
      sortable: false,
      editable: true,
      valueOptions: printForms
        .map((printForm) => ({
          value: printForm._id,
          label: printForm.name,
        }))
        .concat([{ label: '-- không --', value: null as unknown as string }]),
    },
  ]
}