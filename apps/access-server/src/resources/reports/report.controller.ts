import { Body, Logger, Res, StreamableFile } from '@nestjs/common'
import { Response } from 'express'

import { AppController, AppRoute } from 'src/core'
import { ExportCTMRequestDto } from './dtos/export-ctm.request-dto'
import { ExportHCGRequestDto } from './dtos/export-hcg.request-dto'
import { ExportHIVRequestDto } from './dtos/export-hiv.request-dto'
import { ExportPapsmearRequestDto } from './dtos/export-papsmear.request-dto'
import { ExportSinhHoaRequestDto } from './dtos/export-sinh-hoa.request-dto'
import { ExportSoiNhuomRequestDto } from './dtos/export-soi-nhuom.request-dto'
import { ExportTDRequestDto } from './dtos/export-td.request-dto'
import { ExportThinprepRequestDto } from './dtos/export-thinprep.request-dto'
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
    const { buffer, filename } = await this.reportService.exportSoiNhuom(body)
    res.set(generateExcelHeader(filename))

    return new StreamableFile(buffer)
  }

  @AppRoute(reportRoutes.exportTraKQ)
  async exportTraKQ(
    @Body() body: ExportTraKQRequestDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { buffer, filename } = await this.reportService.exportTraKQ(body)
    res.set(generateExcelHeader(filename))

    return new StreamableFile(buffer)
  }

  @AppRoute(reportRoutes.exportGiaoNhanMau)
  async exportGiaoNhanMau(
    @Body() body: ExportTraKQRequestDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { buffer, filename } = await this.reportService.exportGiaoNhanMau(
      body
    )
    res.set(generateExcelHeader(filename))

    return new StreamableFile(buffer)
  }

  @AppRoute(reportRoutes.exportTD)
  async exportTD(
    @Body() body: ExportTDRequestDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { buffer, filename } = await this.reportService.exportTD(body)
    res.set(generateExcelHeader(filename))

    return new StreamableFile(buffer)
  }

  @AppRoute(reportRoutes.exportHCG)
  async exportHCG(
    @Body() body: ExportHCGRequestDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { buffer, filename } = await this.reportService.exportHCG(body)
    res.set(generateExcelHeader(filename))

    return new StreamableFile(buffer)
  }

  @AppRoute(reportRoutes.exportUrine10)
  async exportUrine10(
    @Body() body: ExportHCGRequestDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { buffer, filename } = await this.reportService.exportUrine10(body)
    res.set(generateExcelHeader(filename))

    return new StreamableFile(buffer)
  }

  @AppRoute(reportRoutes.exportSinhHoa)
  async exportSinhHoa(
    @Body() body: ExportSinhHoaRequestDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { buffer, filename } = await this.reportService.exportSinhHoa(body)
    res.set(generateExcelHeader(filename))

    return new StreamableFile(buffer)
  }

  @AppRoute(reportRoutes.exportPapsmear)
  async exportPapsmear(
    @Body() body: ExportPapsmearRequestDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { buffer, filename } = await this.reportService.exportPapsmear(body)
    res.set(generateExcelHeader(filename))

    return new StreamableFile(buffer)
  }

  @AppRoute(reportRoutes.exportThinprep)
  async exportThinprep(
    @Body() body: ExportThinprepRequestDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { buffer, filename } = await this.reportService.exportThinprep(body)
    res.set(generateExcelHeader(filename))

    return new StreamableFile(buffer)
  }

  @AppRoute(reportRoutes.exportCTM)
  async exportCTM(
    @Body() body: ExportCTMRequestDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { buffer, filename } = await this.reportService.exportCTM(body)
    res.set(generateExcelHeader(filename))

    return new StreamableFile(buffer)
  }

  @AppRoute(reportRoutes.exportHIV)
  async exportHIV(
    @Body() body: ExportHIVRequestDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { buffer, filename } = await this.reportService.exportHIV(body)
    res.set(generateExcelHeader(filename))

    return new StreamableFile(buffer)
  }
}

function generateExcelHeader(filename: string) {
  return {
    'Content-Type':
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'Content-Disposition': `attachment; filename="${filename}"`,
  }
}
