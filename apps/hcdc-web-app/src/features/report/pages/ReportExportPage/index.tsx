export * from './loader'
import { useEffect } from 'react'
import { useLoaderData, useRevalidator } from 'react-router-dom'

import { ReportExportView } from '../../components'
import { reportExportPageLoader } from './loader'
import { useTypedSelector } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'

export function urlReportExportPage() {
  return '/report/export'
}

export function ReportExportPage() {
  const { origins, patientTypes, testCombos, tests } =
    useLoaderData() as Awaited<ReturnType<typeof reportExportPageLoader>>
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const revalidator = useRevalidator()

  useEffect(() => {
    revalidator.revalidate()
  }, [branchId])

  return <ReportExportView origins={origins} />
}
