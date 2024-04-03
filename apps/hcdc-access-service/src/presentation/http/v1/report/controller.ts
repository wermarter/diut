import { Body } from '@nestjs/common'

import { reportRoutes } from './routes'
import { HttpController, HttpRoute, streamExcel } from '../../common'
import {
  ReportQuerySoNhanMauUseCase,
  ReportExportSoNhanMauUseCase,
  ReportExportSinhHoaUseCase,
  ReportExportSoiNhuomUseCase,
  ReportExportTDDUseCase,
} from 'src/app/report'
import { ReportQuerySoNhanMauRequestDto } from './dto/query-so-nhan-mau.dto'
import { ExportSoNhanMauRequestDto } from './dto/export-so-nhan-mau.dto'
import { ExportSinhHoaRequestDto } from './dto/export-sinh-hoa.dto'
import { ExportSoiNhuomRequestDto } from './dto/export-soi-nhuom.dto'
import { ExportTDDRequestDto } from './dto/export-tdd.dto'

@HttpController({
  basePath: 'v1/reports',
})
export class ReportController {
  constructor(
    private readonly reportQuerySoNhanMauUseCase: ReportQuerySoNhanMauUseCase,
    private readonly reportExportSoNhanMauUseCase: ReportExportSoNhanMauUseCase,
    private readonly reportExportSinhHoaUseCase: ReportExportSinhHoaUseCase,
    private readonly reportExportSoiNhuomUseCase: ReportExportSoiNhuomUseCase,
    private readonly reportExportTDDUseCase: ReportExportTDDUseCase,
  ) {}

  @HttpRoute(reportRoutes.querySoNhanMau)
  async querySoNhanMau(@Body() body: ReportQuerySoNhanMauRequestDto) {
    return this.reportQuerySoNhanMauUseCase.execute(body)
  }

  @HttpRoute(reportRoutes.exportSoNhanMau)
  async exportSoNhanMau(@Body() body: ExportSoNhanMauRequestDto) {
    const { buffer, filename } =
      await this.reportExportSoNhanMauUseCase.execute(body)
    return streamExcel({ buffer, filename })
  }

  @HttpRoute(reportRoutes.exportSinhHoa)
  async exportSinhHoa(@Body() body: ExportSinhHoaRequestDto) {
    const { buffer, filename } =
      await this.reportExportSinhHoaUseCase.execute(body)
    return streamExcel({ buffer, filename })
  }

  @HttpRoute(reportRoutes.exportSoiNhuom)
  async exportSoiNhuom(@Body() body: ExportSoiNhuomRequestDto) {
    const { buffer, filename } =
      await this.reportExportSoiNhuomUseCase.execute(body)
    return streamExcel({ buffer, filename })
  }

  @HttpRoute(reportRoutes.exportTDD)
  async exportTDD(@Body() body: ExportTDDRequestDto) {
    const { buffer, filename } = await this.reportExportTDDUseCase.execute(body)
    return streamExcel({ buffer, filename })
  }
}
