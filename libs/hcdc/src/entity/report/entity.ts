import { stringEnumValues } from '@diut/common'

export enum ReportType {
  SoNhanMau = 'SoNhanMau',
  SinhHoa = 'SinhHoa',
  SoiNhuom = 'SoiNhuom',
}

export const ReportTypeValues = stringEnumValues(ReportType)

export type Report = {
  type: ReportType
}

export enum ReportAction {
  View = 'View',
  Export = 'Export',
}
