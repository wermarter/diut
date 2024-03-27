import { WorkBook, utils } from 'xlsx'

export interface IReportExportStrategy<TOptions = unknown> {
  setOptions(options: TOptions): void
  prepareWorkbook(): Promise<WorkBook>
}

/**
 * Child class must be Transient scope because setOptions may cause race condition
 */
export abstract class AbstractReportExportStrategy<
  TOptions,
  TData extends { items: unknown[] },
> implements IReportExportStrategy<TOptions>
{
  constructor(
    private readonly columns: { field: string; name: string }[],
    private readonly columnGroups?: {
      groupId: string
      children: { field: string }[]
    }[],
  ) {}

  private options: TOptions
  setOptions(options: TOptions) {
    this.options = options
  }

  abstract fetchData(): Promise<TData>

  abstract buildWorkbook(workbook: WorkBook, options: TOptions): Promise<void>

  async prepareWorkbook() {
    const workbook = utils.book_new()

    await this.buildWorkbook(workbook, this.options)

    return workbook
  }
}
