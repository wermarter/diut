import * as puppeteer from 'puppeteer-core'
import { Inject, Injectable } from '@nestjs/common'

import { IPuppeteerService, PuppeteerServiceToken } from 'src/domain'

export enum Orientation {
  Portrait = 'Portrait',
  Landscape = 'Landscape',
}

export type PdfCreateOption = {
  htmlContent: string
  pageFormat: puppeteer.PaperFormat
  pageOrientation: Orientation
}

@Injectable()
export class PuppeteerCreatePDFUseCase {
  constructor(
    @Inject(PuppeteerServiceToken)
    private readonly puppeteerService: IPuppeteerService,
  ) {}

  async execute(input: PdfCreateOption) {
    const page = await this.puppeteerService.getBrowser().newPage()
    try {
      // prevent old image cache
      page.setCacheEnabled(false)
      await page.setContent(input.htmlContent, { waitUntil: 'networkidle0' })

      const buffer = await page.pdf({
        format: input.pageFormat,
        landscape: input.pageOrientation === Orientation.Landscape,
        printBackground: true,
        margin: {
          left: '0px',
          top: '0px',
          right: '0px',
          bottom: '0px',
        },
        displayHeaderFooter: true,
        footerTemplate: `
          <div style="width: 100vw; font-size: 8px; display: flex; justify-content: flex-end; padding: 0 10mm;">
            <div><span class="pageNumber"></span>/<span class="totalPages"></span></div>
          <div>`,
      })

      return buffer
    } finally {
      await page.close()
    }
  }
}
