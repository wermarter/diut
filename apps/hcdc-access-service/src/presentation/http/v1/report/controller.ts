import { Body } from '@nestjs/common'

import { reportRoutes } from './routes'
import { HttpController, HttpRoute } from '../../common'
import {
  ReportQuerySoNhanMauUseCase,
  ReportExportSoNhanMauUseCase,
} from 'src/app/report'
import { ReportQuerySoNhanMauRequestDto } from './dto/query-so-nhan-mau.dto'
import { ExportSoNhanMauRequestDto } from './dto/export-so-nhan-mau.dto'

@HttpController({
  basePath: 'v1/reports',
})
export class ReportController {
  constructor(
    private readonly reportQuerySoNhanMauUseCase: ReportQuerySoNhanMauUseCase,
    private readonly reportExportSoNhanMauUseCase: ReportExportSoNhanMauUseCase,
  ) {}

  @HttpRoute(reportRoutes.querySoNhanMau)
  async querySoNhanMau(@Body() body: ReportQuerySoNhanMauRequestDto) {
    return this.reportQuerySoNhanMauUseCase.execute(body)
  }

  @HttpRoute(reportRoutes.exportSoNhanMau)
  async exportSoNhanMau(@Body() body: ExportSoNhanMauRequestDto) {
    return this.reportExportSoNhanMauUseCase.execute(body)
  }
}
