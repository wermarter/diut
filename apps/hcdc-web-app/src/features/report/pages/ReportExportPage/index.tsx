export * from './loader'
import { useEffect } from 'react'
import { useLoaderData, useRevalidator } from 'react-router-dom'
import { authSlice } from 'src/features/auth'
import { useTypedSelector } from 'src/infra/redux'
import { ReportExportView } from '../../components'
import { reportExportPageLoader } from './loader'

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

  return (
    <ReportExportView
      origins={origins}
      patientTypes={patientTypes}
      testCombos={testCombos}
      tests={tests}
    />
  )
}
