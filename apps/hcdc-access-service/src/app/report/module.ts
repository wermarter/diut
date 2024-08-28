import { ModuleMetadata } from '@nestjs/common'

import { ReportExportContext } from './export-strategy/context'
import { ReportExportCTMStrategy } from './export-strategy/ctm'
import { ReportExportGiaoNhanStrategy } from './export-strategy/giao-nhan'
import { ReportExportHCGStrategy } from './export-strategy/hcg'
import { ReportExportHIVStrategy } from './export-strategy/hiv'
import { ReportExportPapStrategy } from './export-strategy/pap'
import { ReportExportSinhHoaStrategy } from './export-strategy/sinh-hoa'
import { ReportExportSoNhanMauStrategy } from './export-strategy/so-nhan-mau'
import { ReportExportSoiNhuomStrategy } from './export-strategy/soi-nhuom'
import { ReportExportTDDStrategy } from './export-strategy/tdd'
import { ReportExportThinprepStrategy } from './export-strategy/thinprep'
import { ReportExportTraKQStrategy } from './export-strategy/tra-kq'
import { ReportExportUrineStrategy } from './export-strategy/urine'
import { ReportExportCTMUseCase } from './use-case/export-ctm'
import { ReportExportGiaoNhanUseCase } from './use-case/export-giao-nhan'
import { ReportExportHCGUseCase } from './use-case/export-hcg'
import { ReportExportHIVUseCase } from './use-case/export-hiv'
import { ReportExportPapUseCase } from './use-case/export-pap'
import { ReportExportSinhHoaUseCase } from './use-case/export-sinh-hoa'
import { ReportExportSoNhanMauUseCase } from './use-case/export-so-nhan-mau'
import { ReportExportSoiNhuomUseCase } from './use-case/export-soi-nhuom'
import { ReportExportTDDUseCase } from './use-case/export-tdd'
import { ReportExportThinprepUseCase } from './use-case/export-thinprep'
import { ReportExportTraKQUseCase } from './use-case/export-tra-kq'
import { ReportExportUrineUseCase } from './use-case/export-urine'
import { ReportQueryExportDataUseCase } from './use-case/query-export-data'
import { ReportQuerySoNhanMauUseCase } from './use-case/query-so-nhan-mau'

export const reportMetadata: ModuleMetadata = {
  providers: [
    ReportExportContext,
    ReportExportSoNhanMauStrategy,
    ReportExportSinhHoaStrategy,
    ReportExportSoiNhuomStrategy,
    ReportExportTDDStrategy,
    ReportExportUrineStrategy,
    ReportExportHCGStrategy,
    ReportExportPapStrategy,
    ReportExportThinprepStrategy,
    ReportExportHIVStrategy,
    ReportExportCTMStrategy,
    ReportExportTraKQStrategy,
    ReportExportGiaoNhanStrategy,

    ReportQuerySoNhanMauUseCase,
    ReportExportSoNhanMauUseCase,
    ReportQueryExportDataUseCase,
    ReportExportSinhHoaUseCase,
    ReportExportSoiNhuomUseCase,
    ReportExportTDDUseCase,
    ReportExportUrineUseCase,
    ReportExportHCGUseCase,
    ReportExportPapUseCase,
    ReportExportThinprepUseCase,
    ReportExportHIVUseCase,
    ReportExportCTMUseCase,
    ReportExportTraKQUseCase,
    ReportExportGiaoNhanUseCase,
  ],
}
