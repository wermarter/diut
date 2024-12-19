import { Inject } from '@nestjs/common'
import { Observable, concatMap } from 'rxjs'
import {
  PdfCreateOption,
  PuppeteerCreatePDFUseCase,
} from 'src/app/puppeteer/use-case/create-pdf'
import { IPdfService, PDF_SERVICE_TOKEN } from 'src/domain'

export class BrowserPrintMultipleUseCase {
  constructor(
    @Inject(PDF_SERVICE_TOKEN) private readonly pdfService: IPdfService,
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
