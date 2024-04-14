import { Inject } from '@nestjs/common'
import { Observable, concatMap } from 'rxjs'

import { PdfCreateOption, PuppeteerCreatePDFUseCase } from 'src/app/puppeteer'
import { IPdfService, PdfServiceToken } from 'src/domain'

export class BrowserPrintMultipleUseCase {
  constructor(
    @Inject(PdfServiceToken) private readonly pdfService: IPdfService,
    private readonly puppeteerCreatePdfUseCase: PuppeteerCreatePDFUseCase,
  ) {}

  async execute(request: Observable<PdfCreateOption>) {
    const pdf$ = request.pipe(
      concatMap((value) => this.puppeteerCreatePdfUseCase.execute(value)),
    )
    const mergedPdf = await this.pdfService.mergePdf(pdf$)

    return mergedPdf
  }
}
