import {
  BadRequestException,
  Body,
  Logger,
  Res,
  StreamableFile,
} from '@nestjs/common'
import { Response } from 'express'

import { AppController, AppRoute } from 'src/core'
import { ExportSoiNhuomRequestDto } from './dtos/export-soi-nhuom.request-dto'
import { ExportTraKQRequestDto } from './dtos/export-tra-kq.request-dto'
import { reportRoutes } from './report.routes'
import { ReportService } from './report.service'

@AppController(reportRoutes.controller)
export class ReportController {
  private logger: Logger

  constructor(private reportService: ReportService) {
    this.logger = new Logger(ReportService.name)
  }

  @AppRoute(reportRoutes.exportSoiNhuom)
  async exportSoiNhuom(
    @Body() body: ExportSoiNhuomRequestDto,
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      const { buffer, filename } = await this.reportService.exportSoiNhuom(body)

      res.set({
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
      })

      return new StreamableFile(buffer)
    } catch (e) {
      this.logger.error(e)
      throw new BadRequestException()
    }
  }

  @AppRoute(reportRoutes.exportTraKQ)
  async exportTraKQ(
    @Body() body: ExportTraKQRequestDto,
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      const { buffer, filename } = await this.reportService.exportTraKQ(body)

      res.set({
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
      })

      return new StreamableFile(buffer)
    } catch (e) {
      this.logger.error(e)
      throw new BadRequestException()
    }
  }
}
