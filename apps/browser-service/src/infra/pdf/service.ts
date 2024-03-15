import { Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { PDFDocument } from 'pdf-lib'

import { IPdfService } from 'src/domain'

@Injectable()
export class PdfService implements IPdfService {
  async mergePdf(pdf$: Observable<Buffer>) {
    const mergedPdf = await PDFDocument.create()

    await pdf$.forEach(async (buffer) => {
      const document = await PDFDocument.load(buffer)

      const copiedPages = await mergedPdf.copyPages(
        document,
        document.getPageIndices(),
      )

      copiedPages.forEach((page) => mergedPdf.addPage(page))
      console.log(`Merged ${copiedPages.length} pages`)
    })

    return mergedPdf.save()
  }
}
