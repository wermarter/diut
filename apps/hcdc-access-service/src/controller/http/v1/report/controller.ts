import { Body } from '@nestjs/common'

import { reportRoutes } from './routes'
import { HttpController, HttpRoute, streamExcel } from '../../shared'
import { ReportQuerySoNhanMauRequestDto } from './dto/query-so-nhan-mau'
import { ExportSoNhanMauRequestDto } from './dto/export-so-nhan-mau'
import { ExportSinhHoaRequestDto } from './dto/export-sinh-hoa'
import { ExportSoiNhuomRequestDto } from './dto/export-soi-nhuom'
import { ExportTDDRequestDto } from './dto/export-tdd'
import { ExportUrineRequestDto } from './dto/export-urine'
import { ExportHCGRequestDto } from './dto/export-hcg'
import { ExportPapRequestDto } from './dto/export-pap'
import { ExportThinprepRequestDto } from './dto/export-thinprep'
import { ExportHIVRequestDto } from './dto/export-hiv'
import { ExportCTMRequestDto } from './dto/export-ctm'
import { ExportTraKQRequestDto } from './dto/export-tra-kq'
import { ExportGiaoNhanRequestDto } from './dto/export-giao-nhan'
import { ReportQuerySoNhanMauUseCase } from 'src/app/report/use-case/query-so-nhan-mau'
import { ReportExportSoNhanMauUseCase } from 'src/app/report/use-case/export-so-nhan-mau'
import { ReportExportSinhHoaUseCase } from 'src/app/report/use-case/export-sinh-hoa'
import { ReportExportSoiNhuomUseCase } from 'src/app/report/use-case/export-soi-nhuom'
import { ReportExportTDDUseCase } from 'src/app/report/use-case/export-tdd'
import { ReportExportUrineUseCase } from 'src/app/report/use-case/export-urine'
import { ReportExportHCGUseCase } from 'src/app/report/use-case/export-hcg'
import { ReportExportPapUseCase } from 'src/app/report/use-case/export-pap'
import { ReportExportThinprepUseCase } from 'src/app/report/use-case/export-thinprep'
import { ReportExportHIVUseCase } from 'src/app/report/use-case/export-hiv'
import { ReportExportCTMUseCase } from 'src/app/report/use-case/export-ctm'
import { ReportExportTraKQUseCase } from 'src/app/report/use-case/export-tra-kq'
import { ReportExportGiaoNhanUseCase } from 'src/app/report/use-case/export-giao-nhan'

@HttpController({
  basePath: 'reports',
})
export class ReportController {
  constructor(
    private readonly reportQuerySoNhanMauUseCase: ReportQuerySoNhanMauUseCase,
    private readonly reportExportSoNhanMauUseCase: ReportExportSoNhanMauUseCase,
    private readonly reportExportSinhHoaUseCase: ReportExportSinhHoaUseCase,
    private readonly reportExportSoiNhuomUseCase: ReportExportSoiNhuomUseCase,
    private readonly reportExportTDDUseCase: ReportExportTDDUseCase,
    private readonly reportExportUrineUseCase: ReportExportUrineUseCase,
    private readonly reportExportHCGUseCase: ReportExportHCGUseCase,
    private readonly reportExportPapUseCase: ReportExportPapUseCase,
    private readonly reportExportThinprepUseCase: ReportExportThinprepUseCase,
    private readonly reportExportHIVUseCase: ReportExportHIVUseCase,
    private readonly reportExportCTMUseCase: ReportExportCTMUseCase,
    private readonly reportExportTraKQUseCase: ReportExportTraKQUseCase,
    private readonly reportExportGiaoNhanUseCase: ReportExportGiaoNhanUseCase,
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

  @HttpRoute(reportRoutes.exportUrine)
  async exportUrine(@Body() body: ExportUrineRequestDto) {
    const { buffer, filename } =
      await this.reportExportUrineUseCase.execute(body)
    return streamExcel({ buffer, filename })
  }

  @HttpRoute(reportRoutes.exportHCG)
  async exportHCG(@Body() body: ExportHCGRequestDto) {
    const { buffer, filename } = await this.reportExportHCGUseCase.execute(body)
    return streamExcel({ buffer, filename })
  }

  @HttpRoute(reportRoutes.exportPap)
  async exportPap(@Body() body: ExportPapRequestDto) {
    const { buffer, filename } = await this.reportExportPapUseCase.execute(body)
    return streamExcel({ buffer, filename })
  }

  @HttpRoute(reportRoutes.exportThinprep)
  async exportThinprep(@Body() body: ExportThinprepRequestDto) {
    const { buffer, filename } =
      await this.reportExportThinprepUseCase.execute(body)
    return streamExcel({ buffer, filename })
  }

  @HttpRoute(reportRoutes.exportHIV)
  async exportHIV(@Body() body: ExportHIVRequestDto) {
    const { buffer, filename } = await this.reportExportHIVUseCase.execute(body)
    return streamExcel({ buffer, filename })
  }

  @HttpRoute(reportRoutes.exportCTM)
  async exportCTM(@Body() body: ExportCTMRequestDto) {
    const { buffer, filename } = await this.reportExportCTMUseCase.execute(body)
    return streamExcel({ buffer, filename })
  }

  @HttpRoute(reportRoutes.exportTraKQ)
  async exportTraKQ(@Body() body: ExportTraKQRequestDto) {
    const { buffer, filename } =
      await this.reportExportTraKQUseCase.execute(body)
    return streamExcel({ buffer, filename })
  }

  @HttpRoute(reportRoutes.exportGiaoNhan)
  async exportGiaoNhan(@Body() body: ExportGiaoNhanRequestDto) {
    const { buffer, filename } =
      await this.reportExportGiaoNhanUseCase.execute(body)
    return streamExcel({ buffer, filename })
  }
}
