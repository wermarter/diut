import { DateNFOption, WorkBook, utils } from 'xlsx'

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

/**
 * Child class must be Transient scope and resolved with ModuleRef because setOptions may cause race condition
 */
export abstract class AbstractReportExportStrategy<TOptions, TItem>
  implements IReportExportStrategy<TOptions>
{
  protected options: TOptions
  setOptions(options: TOptions) {
    this.options = options
  }

  abstract prepareTableConfig(): Promise<TableConfig<TItem>>

  async prepareWorkbook() {
    const workbook = utils.book_new()
    if (!workbook.Props) workbook.Props = {}

    const { name, items, columns, columnGroups, dateNF } =
      await this.prepareTableConfig()

    const worksheet = utils.sheet_new({ dense: true })
    if (!worksheet['!merges']) worksheet['!merges'] = []
    const aoa: unknown[][] = []

    if (columnGroups) {
      const row: unknown[] = []

      let colGroupIndex = 0
      let currentColGroup = columnGroups[0]
      for (let colIndex = 0; colIndex < columns.length; colIndex++) {
        const currentCol = columns[colIndex]

        if (currentCol.columnId === currentColGroup.columns[0].columnId) {
          worksheet['!merges'].push({
            s: { r: 0, c: colIndex },
            e: { r: 0, c: colIndex + currentColGroup.columns.length - 1 },
          })
          row.push(currentColGroup.groupName)
          currentColGroup = columnGroups[++colGroupIndex]
          if (currentColGroup === undefined) break
        } else {
          row.push('')
        }
      }

      aoa.push(row)
    }

    aoa.push(columns.map((c) => c.columnName))

    items.forEach((item, index) => {
      const row: unknown[] = []
      for (const column of columns) {
        row.push(column.valueGetter?.(item) ?? (index + 1).toString())
      }
      aoa.push(row)
    })

    aoa.push(columns.map((c) => c.summaryGetter?.() ?? ''))

    utils.sheet_add_aoa(worksheet, aoa, { dateNF })
    utils.book_append_sheet(workbook, worksheet)
    workbook.Props.Title = name

    return workbook
  }
}
