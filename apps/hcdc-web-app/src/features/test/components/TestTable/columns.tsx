import { GridColDef } from '@mui/x-data-grid'
import { identity } from 'es-toolkit'
import { useMemo } from 'react'

import { BioProductResponseDto } from 'src/infra/api/access-service/bio-product'
import { InstrumentResponseDto } from 'src/infra/api/access-service/instrument'
import { PrintFormResponseDto } from 'src/infra/api/access-service/print-form'
import { SampleTypeResponseDto } from 'src/infra/api/access-service/sample-type'
import { TestResponseDto } from 'src/infra/api/access-service/test'

export function useTestColumns(
  bioProducts: BioProductResponseDto[],
  instruments: InstrumentResponseDto[],
  sampleTypes: SampleTypeResponseDto[],
  printFormMap: Map<string, PrintFormResponseDto>,
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

  const instrumentLookup = useMemo(() => {
    const instrumentMap: Record<string, InstrumentResponseDto[]> = {}
    instruments.forEach((item) => {
      if (instrumentMap[item.testId] === undefined) {
        instrumentMap[item.testId] = []
      }
      instrumentMap[item.testId].push(item)
    })

    const rv: Record<string, { label: string; value: string | null }[]> = {}

    for (const testId in instrumentMap) {
      rv[testId] = instrumentMap[testId]
        .map((item) => ({
          value: item._id,
          label: item.name,
        }))
        .concat([{ label: '-- không --', value: null as unknown as string }])
    }

    return rv
  }, [instruments])

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
      width: 150,
      sortable: false,
      editable: true,
      valueOptions(params) {
        return bioProductLookup?.[params.row?._id!]
      },
    },
    {
      field: 'instrumentId',
      headerName: 'Máy XN',
      type: 'singleSelect',
      width: 150,
      sortable: false,
      editable: true,
      valueOptions(params) {
        return instrumentLookup?.[params.row?._id!]
      },
    },
    {
      field: 'sampleTypeId',
      type: 'singleSelect',
      headerName: 'Loại mẫu',
      width: 120,
      sortable: false,
      editable: true,
      valueOptions: sampleTypes
        .map((sampleType) => ({
          value: sampleType._id,
          label: sampleType.name,
        }))
        .concat([{ label: '-- không --', value: null as unknown as string }]),
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
      field: 'printForms',
      type: 'singleSelect',
      headerName: 'Form In',
      width: 180,
      sortable: false,
      editable: false,
      valueGetter: ({ row }) => {
        const printFormNames = row.printFormIds
          ?.map((printFormId) => printFormMap.get(printFormId)?.name)
          .filter(identity)
        if (printFormNames?.length === 0) {
          return '-- không --'
        }

        return printFormNames?.join(', ')
      },
    },
  ]
}
