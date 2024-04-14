export * from './loader'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  useLoaderData,
  useRevalidator,
  useSearchParams,
} from 'react-router-dom'

import { PrintSelectPageQuery, printSelectPageLoader } from './loader'
import { PrintSelectView } from '../../components'
import { useTypedSelector } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'
import { ROWS_PER_PAGE_OPTIONS } from 'src/shared'

const PARAM_PAGE = 'page'
const PARAM_PAGE_SIZE = 'pageSize'
const PARAM_PATIENT_TYPE_ID = 'patientTypeId'
const PARAM_ORIGIN_ID = 'originId'
const PARAM_SAMPLE_ID = 'sampleId'
const PARAM_FROM_DATE = 'fromDate'
const PARAM_TO_DATE = 'toDate'
const PARAM_TEST_IDS = 'testIds'
const PARAM_PATIENT_ID = 'patientId'

export function urlPrintSelectPage(query?: PrintSelectPageQuery) {
  if (query?.patientId) {
    return `/result/print?${PARAM_PATIENT_ID}=${query.patientId}`
  }
  return '/result/print'
}

export function PrintSelectPage() {
  const {
    patientTypeMap,
    testMap,
    originMap,
    tests,
    printFormMap,
    sampleTypeMap,
  } = useLoaderData() as Awaited<ReturnType<typeof printSelectPageLoader>>
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const revalidator = useRevalidator()

  useEffect(() => {
    revalidator.revalidate()
  }, [branchId])

  const [searchParams, setSearchParams] = useSearchParams({
    [PARAM_PAGE]: '0',
    [PARAM_PAGE_SIZE]: ROWS_PER_PAGE_OPTIONS[0].toString(),
    [PARAM_FROM_DATE]: new Date().getTime().toString(),
    [PARAM_TO_DATE]: new Date().getTime().toString(),
  })
  const [page, setPageCb] = useState(searchParams.get(PARAM_PAGE)!)
  const [pageSize, setPageSizeCb] = useState(searchParams.get(PARAM_PAGE_SIZE)!)
  const [patientTypeId, setPatientTypeIdCb] = useState(
    searchParams.get(PARAM_PATIENT_TYPE_ID),
  )
  const [originId, setOriginIdCb] = useState(searchParams.get(PARAM_ORIGIN_ID))
  const [sampleId, setSampleIdCb] = useState(searchParams.get(PARAM_SAMPLE_ID))
  const [patientId, setPatientId] = useState(searchParams.get(PARAM_PATIENT_ID))
  const [fromDate, setFromDateCb] = useState(searchParams.get(PARAM_FROM_DATE)!)
  const [toDate, setToDateCb] = useState(searchParams.get(PARAM_TO_DATE)!)
  const [testIds, setTestIds] = useState(searchParams.getAll(PARAM_TEST_IDS))

  const setFromDate = useCallback((fromDate: Date) => {
    setFromDateCb(fromDate.getTime().toString())
  }, [])
  const setToDate = useCallback((toDate: Date) => {
    setToDateCb(toDate.getTime().toString())
  }, [])

  const setPage = useCallback((page: number) => setPageCb(page.toString()), [])
  const setPageSize = useCallback(
    (pageSize: number) => setPageSizeCb(pageSize.toString()),
    [],
  )

  const setPatientTypeId = useCallback((patientTypeId: string | null) => {
    if (patientTypeId === null) {
      setPatientTypeIdCb(null)
      return
    }
    setPatientTypeIdCb(patientTypeId.toString())
  }, [])

  const setOriginId = useCallback((originId: string | null) => {
    if (originId === null) {
      setOriginIdCb(null)
      return
    }
    setOriginIdCb(originId.toString())
  }, [])

  const setSampleId = useCallback((sampleId: string | null) => {
    if (sampleId === null) {
      setSampleIdCb(null)
      return
    }
    setSampleIdCb(sampleId.toString())
  }, [])

  useEffect(() => {
    setSearchParams(
      {
        [PARAM_PAGE]: page,
        [PARAM_PAGE_SIZE]: pageSize,
        [PARAM_FROM_DATE]: fromDate,
        [PARAM_TO_DATE]: toDate,
        [PARAM_TEST_IDS]: testIds,
        ...(originId && {
          [PARAM_ORIGIN_ID]: originId,
        }),
        ...(sampleId && {
          [PARAM_SAMPLE_ID]: sampleId,
        }),
        ...(patientTypeId && {
          [PARAM_PATIENT_TYPE_ID]: patientTypeId,
        }),
        ...(patientId && {
          [PARAM_PATIENT_ID]: patientId,
        }),
      },
      { replace: false },
    )
  }, [
    page,
    pageSize,
    patientTypeId,
    originId,
    sampleId,
    fromDate,
    toDate,
    patientId,
    JSON.stringify(testIds),
  ])

  const isFirstRun = useRef(true)
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    setPageCb('0')
    setPatientTypeIdCb(null)
    setPatientId(null)
    setOriginId(null)
    setTestIds([])
  }, [branchId])

  return (
    <PrintSelectView
      patientTypeMap={patientTypeMap}
      testMap={testMap}
      originMap={originMap}
      printFormMap={printFormMap}
      sampleTypeMap={sampleTypeMap}
      page={parseInt(page)}
      pageSize={parseInt(pageSize)}
      setPage={setPage}
      setPageSize={setPageSize}
      patientTypeId={patientTypeId}
      setPatientTypeId={setPatientTypeId}
      originId={originId}
      setOriginId={setOriginId}
      sampleId={sampleId}
      setSampleId={setSampleId}
      fromDate={new Date(parseInt(fromDate))}
      setFromDate={setFromDate}
      toDate={new Date(parseInt(toDate))}
      setToDate={setToDate}
      testIds={testIds}
      setTestIds={setTestIds}
      tests={tests}
      patientId={patientId}
    />
  )
}
