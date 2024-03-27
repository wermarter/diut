import { ModuleMetadata } from '@nestjs/common'

import { ReportQuerySoNhanMauUseCase } from './use-case/query-so-nhan-mau'
import { ReportExportSoNhanMauUseCase } from './use-case/export-so-nhan-mau'
import { ReportExportSoNhanMauStrategy } from './export-strategy/so-nhan-mau'
import { ReportExportContext } from './export-strategy/context'

export const reportMetadata: ModuleMetadata = {
  providers: [
    ReportExportSoNhanMauStrategy,
    ReportExportContext,

    ReportQuerySoNhanMauUseCase,
    ReportExportSoNhanMauUseCase,
  ],
}
