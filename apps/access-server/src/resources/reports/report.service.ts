import { Injectable, Logger } from '@nestjs/common'
import * as xlsx from 'xlsx'
import { format } from 'date-fns'

import { ExportSoiNhuomRequestDto } from './dtos/export-soi-nhuom.request-dto'
import { SoiNhuomService } from './exports/soi-nhuom.service'
import { DATEONLY_FORMAT } from '@diut/common'

@Injectable()
export class ReportService {
  private logger: Logger

  constructor(private soiNhuomService: SoiNhuomService) {
    this.logger = new Logger(ReportService.name)
  }

  exportWorksheet(worksheet: xlsx.WorkSheet, filename: string) {
    const workbook = xlsx.utils.book_new()
    xlsx.utils.book_append_sheet(workbook, worksheet)

    return {
      buffer: xlsx.write(workbook, { type: 'buffer' }),
      filename,
    }
  }

  async exportSoiNhuom(body: ExportSoiNhuomRequestDto) {
    const worksheet = await this.soiNhuomService.exportWorksheet(body)
    const filename = `8. Soi nhuom (${format(
      new Date(body.startDate),
      DATEONLY_FORMAT
    )} - ${format(new Date(body.endDate), DATEONLY_FORMAT)}).xlsx`

    return this.exportWorksheet(worksheet, filename)
  }
}
