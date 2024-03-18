import { ModuleMetadata } from '@nestjs/common'
import { ClassConstructor } from 'class-transformer'

import { IPdfService, PdfServiceToken } from 'src/domain'
import { PdfService } from './service'

export const pdfMetadata: ModuleMetadata = {
  providers: [
    {
      provide: PdfServiceToken,
      useClass: PdfService satisfies ClassConstructor<IPdfService>,
    },
  ],
}
