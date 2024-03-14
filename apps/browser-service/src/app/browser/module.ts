import { ModuleMetadata } from '@nestjs/common'

import { BrowserService } from './service'

export const browserMetadata: ModuleMetadata = {
  providers: [BrowserService],
}
