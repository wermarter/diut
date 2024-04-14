import { useCallback, useEffect, useRef, useState } from 'react'
import { useRevalidator, useSearchParams } from 'react-router-dom'

import { PatientSearchView } from '../../components'
import { useTypedSelector } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'
import { ROWS_PER_PAGE_OPTIONS } from 'src/shared'

const PARAM_PAGE = 'page'
const PARAM_PAGE_SIZE = 'pageSize'
const PARAM_PATIENT_NAME = 'patientName'
const PARAM_EXTERNAL_ID = 'externalId'

export function urlPatientSearchPage() {
  return '/patient/search'
}

export function PatientSearchPage() {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const revalidator = useRevalidator()

  useEffect(() => {
    revalidator.revalidate()
  }, [branchId])

  const [searchParams, setSearchParams] = useSearchParams({
    [PARAM_PAGE]: '0',
    [PARAM_PAGE_SIZE]: ROWS_PER_PAGE_OPTIONS[0].toString(),
  })
  const [page, setPageCb] = useState(searchParams.get(PARAM_PAGE)!)
  const [pageSize, setPageSizeCb] = useState(searchParams.get(PARAM_PAGE_SIZE)!)
  const [patientName, setPatientNameCb] = useState(
    searchParams.get(PARAM_PATIENT_NAME),
  )
  const [externalId, setExternalIdCb] = useState(
    searchParams.get(PARAM_EXTERNAL_ID),
  )

  const setPage = useCallback((page: number) => setPageCb(page.toString()), [])
  const setPageSize = useCallback(
    (pageSize: number) => setPageSizeCb(pageSize.toString()),
    [],
  )
  const setPatientName = useCallback((patientName: string | null) => {
    if (patientName === null) {
      setPatientNameCb(null)
      return
    }
    setPatientNameCb(patientName.toString())
  }, [])
  const setExternalId = useCallback((externalId: string | null) => {
    if (externalId === null) {
      setExternalIdCb(null)
      return
    }
    setExternalIdCb(externalId.toString())
  }, [])

  useEffect(() => {
    setSearchParams(
      {
        [PARAM_PAGE]: page,
        [PARAM_PAGE_SIZE]: pageSize,
        ...(patientName && {
          [PARAM_PATIENT_NAME]: patientName,
        }),
        ...(externalId && {
          [PARAM_EXTERNAL_ID]: externalId,
        }),
      },
      { replace: false },
    )
  }, [page, pageSize])

  const isFirstRun = useRef(true)
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    setPageCb('0')
    setPatientName(null)
    setExternalId(null)
  }, [branchId])

  return (
    <PatientSearchView
      page={parseInt(page)}
      pageSize={parseInt(pageSize)}
      setPage={setPage}
      setPageSize={setPageSize}
      patientName={patientName}
      setPatientName={setPatientName}
      externalId={externalId}
      setExternalId={setExternalId}
    />
  )
}
