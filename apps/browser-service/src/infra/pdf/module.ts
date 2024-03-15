import { ModuleMetadata } from '@nestjs/common'
import { PdfServiceToken } from 'src/domain'

import { PdfService } from './service'

export const pdfMetadata: ModuleMetadata = {
  providers: [
    {
      provide: PdfServiceToken,
      useClass: PdfService,
    },
  ],
}
