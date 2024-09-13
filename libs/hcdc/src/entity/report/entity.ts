import { AssertAllKeysInArray, stringEnumValues } from '@diut/common'

export enum ReportType {
  SoNhanMau = 'SoNhanMau',
  SinhHoa = 'SinhHoa',
  SoiNhuom = 'SoiNhuom',
  TDD = 'TDD',
  Urine = 'Urine',
  HCG = 'HCG',
  Pap = 'Pap',
  Thinprep = 'Thinprep',
  HIV = 'HIV',
  CTM = 'CTM',
  TraKQ = 'TraKQ',
  GiaoNhan = 'GiaoNhan',
}

export const ReportTypeValues = stringEnumValues(ReportType)

export type Report = {
  type: ReportType
  branchId: string
}

export enum ReportAction {
  View = 'View',
  Export = 'Export',
}

export const ReportFields = ['type', 'branchId'] satisfies (keyof Report)[]

true satisfies AssertAllKeysInArray<typeof ReportFields, Report>
