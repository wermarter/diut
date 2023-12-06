import { Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { PDFDocument } from 'pdf-lib'

@Injectable()
export class PdfService {
  async mergePdfObservable(pdfObservable: Observable<Buffer>) {
    const mergedPdf = await PDFDocument.create()

    await pdfObservable.forEach(async (buffer) => {
      const document = await PDFDocument.load(buffer)

      const copiedPages = await mergedPdf.copyPages(
        document,
        document.getPageIndices(),
      )

      copiedPages.forEach((page) => mergedPdf.addPage(page))
    })
  }
}
