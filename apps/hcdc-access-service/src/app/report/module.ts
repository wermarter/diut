import { ModuleMetadata } from '@nestjs/common'

import { ReportQuerySoNhanMauUseCase } from './use-case/query-so-nhan-mau'
import { ReportExportSoNhanMauUseCase } from './use-case/export-so-nhan-mau'
import { ReportQueryExportDataUseCase } from './use-case/query-export-data'
import { ReportExportContext } from './export-strategy/context'
import { ReportExportSoNhanMauStrategy } from './export-strategy/so-nhan-mau'
import { ReportExportSinhHoaStrategy } from './export-strategy/sinh-hoa'
import { ReportExportSinhHoaUseCase } from './use-case/export-sinh-hoa'
import { ReportExportSoiNhuomStrategy } from './export-strategy/soi-nhuom'
import { ReportExportSoiNhuomUseCase } from './use-case/export-soi-nhuom'
import { ReportExportTDDStrategy } from './export-strategy/tdd'
import { ReportExportTDDUseCase } from './use-case/export-tdd'
import { ReportExportUrineStrategy } from './export-strategy/urine'
import { ReportExportUrineUseCase } from './use-case/export-urine'
import { ReportExportHCGStrategy } from './export-strategy/hcg'
import { ReportExportHCGUseCase } from './use-case/export-hcg'
import { ReportExportPapStrategy } from './export-strategy/pap'
import { ReportExportPapUseCase } from './use-case/export-pap'

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

    ReportQuerySoNhanMauUseCase,
    ReportExportSoNhanMauUseCase,
    ReportQueryExportDataUseCase,
    ReportExportSinhHoaUseCase,
    ReportExportSoiNhuomUseCase,
    ReportExportTDDUseCase,
    ReportExportUrineUseCase,
    ReportExportHCGUseCase,
    ReportExportPapUseCase,
  ],
}
