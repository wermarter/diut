import { DATEONLY_FORMAT } from '@diut/common'
import { Injectable, Logger } from '@nestjs/common'
import * as xlsx from 'xlsx'
import { format } from 'date-fns'

import { ExportSoiNhuomRequestDto } from './dtos/export-soi-nhuom.request-dto'
import { SoiNhuomService } from './exports/soi-nhuom.service'
import { ExportTraKQRequestDto } from './dtos/export-tra-kq.request-dto'
import { TraKQService } from './exports/tra-kq.service'
import { TDService } from './exports/td.service'
import { ExportTDRequestDto } from './dtos/export-td.request-dto'
import { DateRangeDto } from './dtos/date-range.request-dto'
import { ExportHCGRequestDto } from './dtos/export-hcg.request-dto'
import { HCGService } from './exports/hcg.service'
import { ExportUrine10RequestDto } from './dtos/export-urine-10.request-dto'
import { Urine10Service } from './exports/urine10.service'
import { SinhHoaService } from './exports/sinh-hoa.service'
import { PapsmearService } from './exports/papsmear.service'
import { ThinprepService } from './exports/thinprep.service'
import { ExportSinhHoaRequestDto } from './dtos/export-sinh-hoa.request-dto'
import { ExportPapsmearRequestDto } from './dtos/export-papsmear.request-dto'
import { ExportThinprepRequestDto } from './dtos/export-thinprep.request-dto'
import { CTMService } from './exports/ctm.service'
import { ExportCTMRequestDto } from './dtos/export-ctm.request-dto'
import { HIVService } from './exports/hiv.service'
import { ExportHIVRequestDto } from './dtos/export-hiv.request-dto'

@Injectable()
export class ReportService {
  private logger: Logger

  constructor(
    private soiNhuomService: SoiNhuomService,
    private traKQService: TraKQService,
    private tdService: TDService,
    private hcgService: HCGService,
    private urine10Service: Urine10Service,
    private sinhHoaService: SinhHoaService,
    private papsmearService: PapsmearService,
    private thinprepService: ThinprepService,
    private ctmService: CTMService,
    private hivService: HIVService
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

  async exportTraKQ(body: ExportTraKQRequestDto) {
    const worksheet = await this.traKQService.exportWorksheet(body)
    const filename = generateFilename(body, 'Danh sach Tra KQ')

    return this.exportWorksheet(worksheet, filename)
  }

  async exportSoiNhuom(body: ExportSoiNhuomRequestDto) {
    const worksheet = await this.soiNhuomService.exportWorksheet(body)
    const filename = generateFilename(body, '2 So KQ Soi Nhuom')

    return this.exportWorksheet(worksheet, filename)
  }

  async exportSinhHoa(body: ExportSinhHoaRequestDto) {
    const worksheet = await this.sinhHoaService.exportWorksheet(body)
    const filename = generateFilename(body, '3 So KQ SH-HH-MD')

    return this.exportWorksheet(worksheet, filename)
  }

  async exportTD(body: ExportTDRequestDto) {
    const worksheet = await this.tdService.exportWorksheet(body)
    const filename = generateFilename(body, '4 So KQ TDD')

    return this.exportWorksheet(worksheet, filename)
  }

  async exportUrine10(body: ExportUrine10RequestDto) {
    const worksheet = await this.urine10Service.exportWorksheet(body)
    const filename = generateFilename(body, '5 SO XN Urine 10 thong so')

    return this.exportWorksheet(worksheet, filename)
  }

  async exportHCG(body: ExportHCGRequestDto) {
    const worksheet = await this.hcgService.exportWorksheet(body)
    const filename = generateFilename(body, '6 So KQ XN hCG URINE')

    return this.exportWorksheet(worksheet, filename)
  }

  async exportPapsmear(body: ExportPapsmearRequestDto) {
    const worksheet = await this.papsmearService.exportWorksheet(body)
    const filename = generateFilename(body, '7 So Pap Smear')

    return this.exportWorksheet(worksheet, filename)
  }

  async exportThinprep(body: ExportThinprepRequestDto) {
    const worksheet = await this.thinprepService.exportWorksheet(body)
    const filename = generateFilename(body, '7 So ThinPrep')

    return this.exportWorksheet(worksheet, filename)
  }

  async exportHIV(body: ExportHIVRequestDto) {
    const worksheet = await this.hivService.exportWorksheet(body)
    const filename = generateFilename(body, '8 So sang loc HIV')

    return this.exportWorksheet(worksheet, filename)
  }

  async exportCTM(body: ExportCTMRequestDto) {
    const worksheet = await this.ctmService.exportWorksheet(body)
    const filename = generateFilename(body, '12 So CTM')

    return this.exportWorksheet(worksheet, filename)
  }
}

function generateFilename(body: DateRangeDto, filenamePrefix: string) {
  return `${filenamePrefix} (${format(
    new Date(body.startDate),
    DATEONLY_FORMAT
  )} - ${format(new Date(body.endDate), DATEONLY_FORMAT)}).xlsx`
}
