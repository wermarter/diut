export * from './loader'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  useLoaderData,
  useRevalidator,
  useSearchParams,
} from 'react-router-dom'

import { soNhanMauPageLoader } from './loader'
import { SoNhanMauView } from '../../components'
import { useTypedSelector } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'
import { ROWS_PER_PAGE_OPTIONS } from 'src/shared'

const PARAM_PAGE = 'page'
const PARAM_PAGE_SIZE = 'pageSize'
const PARAM_PATIENT_TYPE_ID = 'patientTypeId'
const PARAM_ORIGIN_ID = 'originId'
const PARAM_IS_NGOAI_GIO = 'isNgoaiGio'
const PARAM_FROM_DATE = 'fromDate'
const PARAM_TO_DATE = 'toDate'

export function urlSoNhanMauPage() {
  return '/report/so-nhan-mau'
}

export function SoNhanMauPage() {
  const { origins, patientTypes, tests } = useLoaderData() as Awaited<
    ReturnType<typeof soNhanMauPageLoader>
  >
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
  const [isNgoaiGio, setIsNgoaiGioCb] = useState(
    searchParams.get(PARAM_IS_NGOAI_GIO),
  )
  const [patientTypeId, setPatientTypeIdCb] = useState(
    searchParams.get(PARAM_PATIENT_TYPE_ID),
  )
  const [originId, setOriginIdCb] = useState(searchParams.get(PARAM_ORIGIN_ID))
  const [fromDate, setFromDateCb] = useState(searchParams.get(PARAM_FROM_DATE)!)
  const [toDate, setToDateCb] = useState(searchParams.get(PARAM_TO_DATE)!)

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

  const setIsNgoaiGio = useCallback((isNgoaiGio: boolean | null) => {
    if (isNgoaiGio === null) {
      setIsNgoaiGioCb(null)
      return
    }
    setIsNgoaiGioCb(isNgoaiGio.toString())
  }, [])

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

  useEffect(() => {
    setSearchParams(
      {
        [PARAM_PAGE]: page,
        [PARAM_PAGE_SIZE]: pageSize,
        [PARAM_FROM_DATE]: fromDate,
        [PARAM_TO_DATE]: toDate,
        ...(originId && {
          [PARAM_ORIGIN_ID]: originId,
        }),
        ...(patientTypeId && {
          [PARAM_PATIENT_TYPE_ID]: patientTypeId,
        }),
        ...(isNgoaiGio && {
          [PARAM_IS_NGOAI_GIO]: isNgoaiGio,
        }),
      },
      { replace: false },
    )
  }, [page, pageSize, isNgoaiGio, patientTypeId, originId, fromDate, toDate])

  const isFirstRun = useRef(true)
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    setPageCb('0')
    setPatientTypeIdCb(null)
    setOriginId(null)
    setIsNgoaiGioCb(null)
  }, [branchId])

  return (
    <SoNhanMauView
      origins={origins}
      patientTypes={patientTypes}
      tests={tests}
      page={parseInt(page)}
      pageSize={parseInt(pageSize)}
      setPage={setPage}
      setPageSize={setPageSize}
      isNgoaiGio={isNgoaiGio !== null ? isNgoaiGio === 'true' : null}
      setIsNgoaiGio={setIsNgoaiGio}
      patientTypeId={patientTypeId}
      setPatientTypeId={setPatientTypeId}
      originId={originId}
      setOriginId={setOriginId}
      fromDate={new Date(parseInt(fromDate))}
      setFromDate={setFromDate}
      toDate={new Date(parseInt(toDate))}
      setToDate={setToDate}
    />
  )
}
