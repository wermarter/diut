import { ModuleMetadata } from '@nestjs/common'

import { ReportSoNhanMauUseCase } from './use-case/so-nhan-mau'

export const reportMetadata: ModuleMetadata = {
  providers: [ReportSoNhanMauUseCase],
}
