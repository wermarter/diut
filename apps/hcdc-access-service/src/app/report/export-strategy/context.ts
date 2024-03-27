import { Injectable } from '@nestjs/common'
import { write } from 'xlsx'

import { IReportExportStrategy } from './common'

@Injectable()
export class ReportExportContext {
  private exportStrategy: IReportExportStrategy

  async setStrategy(strategy: IReportExportStrategy) {
    this.exportStrategy = strategy
  }

  async execute() {
    const workbook = await this.exportStrategy.prepareWorkbook()

    return {
      buffer: write(workbook, { type: 'buffer' }),
      filename: workbook.Props?.Title ?? 'export.xlsx',
    }
  }
}
