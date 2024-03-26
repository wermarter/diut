import { ModuleMetadata } from '@nestjs/common'

import { ReportQuerySoNhanMauUseCase } from './use-case/query-so-nhan-mau'
import { ReportExportSoNhanMauUseCase } from './use-case/export-so-nhan-mau'

export const reportMetadata: ModuleMetadata = {
  providers: [ReportQuerySoNhanMauUseCase, ReportExportSoNhanMauUseCase],
}
