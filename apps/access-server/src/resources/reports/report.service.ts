import { DATEONLY_FORMAT } from '@diut/common'
import { Injectable, Logger } from '@nestjs/common'
import * as xlsx from 'xlsx'
import { format } from 'date-fns'

import { ExportSoiNhuomRequestDto } from './dtos/export-soi-nhuom.request-dto'
import { SoiNhuomService } from './exports/soi-nhuom.service'
import { ExportTraKQRequestDto } from './dtos/export-tra-kq.request-dto'
import { TraKQService } from './exports/tra-kq.service'

@Injectable()
export class ReportService {
  private logger: Logger

  constructor(
    private soiNhuomService: SoiNhuomService,
    private traKQService: TraKQService
  ) {
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
    const filename = `2 So KQ Soi Nhuom (${format(
      new Date(body.startDate),
      DATEONLY_FORMAT
    )} - ${format(new Date(body.endDate), DATEONLY_FORMAT)}).xlsx`

    return this.exportWorksheet(worksheet, filename)
  }

  async exportTraKQ(body: ExportTraKQRequestDto) {
    const worksheet = await this.traKQService.exportWorksheet(body)
    const filename = `Danh sach Tra KQ (${format(
      new Date(body.startDate),
      DATEONLY_FORMAT
    )} - ${format(new Date(body.endDate), DATEONLY_FORMAT)}).xlsx`

    return this.exportWorksheet(worksheet, filename)
  }
}
