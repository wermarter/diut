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

export const reportMetadata: ModuleMetadata = {
  providers: [
    ReportExportContext,
    ReportExportSoNhanMauStrategy,
    ReportExportSinhHoaStrategy,
    ReportExportSoiNhuomStrategy,

    ReportQuerySoNhanMauUseCase,
    ReportExportSoNhanMauUseCase,
    ReportQueryExportDataUseCase,
    ReportExportSinhHoaUseCase,
    ReportExportSoiNhuomUseCase,
  ],
}
