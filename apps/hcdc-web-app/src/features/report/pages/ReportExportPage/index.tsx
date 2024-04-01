export * from './loader'
import { ReportExportView } from '../../components'

export function urlReportExportPage() {
  return '/report/export'
}

export function ReportExportPage() {
  return <ReportExportView />
}
