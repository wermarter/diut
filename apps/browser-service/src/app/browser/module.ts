import { ModuleMetadata } from '@nestjs/common'
import { BrowserPrintMultipleUseCase } from './use-case/print-multiple'

export const browserMetadata: ModuleMetadata = {
  providers: [BrowserPrintMultipleUseCase],
}
