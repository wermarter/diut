import { DateNFOption, WorkBook } from 'xlsx'

export interface IReportExportStrategy<TOptions = unknown> {
  setOptions(options: TOptions): void
  prepareWorkbook(): Promise<WorkBook>
}

export type TableConfig<TItem> = {
  name: string
  items: TItem[]
  columns: {
    columnId: string
    columnName: string
    valueGetter?: (item: TItem) => unknown
    summaryGetter?: () => unknown
  }[]
  columnGroups?: {
    groupName: string
    columns: { columnId: string }[]
  }[]
  dateNF?: DateNFOption['dateNF']
}
