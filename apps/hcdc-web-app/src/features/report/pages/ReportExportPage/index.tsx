export * from './loader'
import { useLoaderData } from 'react-router-dom'

import { ReportExportView } from '../../components'
import { reportExportPageLoader } from './loader'

export function urlReportExportPage() {
  return '/report/export'
}

export function ReportExportPage() {
  const { origins, patientTypes, testCombos, tests } =
    useLoaderData() as Awaited<ReturnType<typeof reportExportPageLoader>>

  return <ReportExportView origins={origins} />
}
