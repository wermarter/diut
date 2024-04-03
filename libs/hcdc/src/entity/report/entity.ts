import { stringEnumValues } from '@diut/common'

export enum ReportType {
  SoNhanMau = 'SoNhanMau',
  SinhHoa = 'SinhHoa',
  SoiNhuom = 'SoiNhuom',
  TDD = 'TDD',
}

export const ReportTypeValues = stringEnumValues(ReportType)

export type Report = {
  type: ReportType
}

export enum ReportAction {
  View = 'View',
  Export = 'Export',
}
