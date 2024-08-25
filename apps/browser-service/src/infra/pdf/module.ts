import { ModuleMetadata } from '@nestjs/common'
import { ClassConstructor } from 'class-transformer'

import { IPdfService, PDF_SERVICE_TOKEN } from 'src/domain'
import { PdfService } from './service'

export const pdfMetadata: ModuleMetadata = {
  providers: [
    {
      provide: PDF_SERVICE_TOKEN,
      useClass: PdfService satisfies ClassConstructor<IPdfService>,
    },
  ],
}
