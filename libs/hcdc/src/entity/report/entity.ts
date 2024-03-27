export enum ReportType {
  SoNhanMau = 'SoNhanMau',
}

export type Report = {
  type: ReportType
}

export enum ReportAction {
  View = 'View',
  Export = 'Export',
}
