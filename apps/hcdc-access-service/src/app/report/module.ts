import { ModuleMetadata } from '@nestjs/common'

import { ReportSoNhanMauQueryUseCase } from './use-case/so-nhan-mau-query'

export const reportMetadata: ModuleMetadata = {
  providers: [ReportSoNhanMauQueryUseCase],
}
