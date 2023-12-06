import { NodeEnv } from '@diut/common'
import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common'
import * as puppeteer from 'puppeteer'

import { AppConfig, loadAppConfig } from 'src/configs'
import { Orientation, chromeArgs } from './browser.common'

export type GeneratePDFOptions = {
  htmlPageContent: string
  paperFormat: puppeteer.PaperFormat
  orientation: Orientation
}

@Injectable()
export class BrowserService implements OnModuleInit, OnModuleDestroy {
  private browser: puppeteer.Browser
  private logger = new Logger(BrowserService.name)

  constructor(
    @Inject(loadAppConfig.KEY) private readonly appConfig: AppConfig,
  ) {}

  async onModuleInit() {
    if (this.appConfig.NODE_ENV === NodeEnv.Development) {
      // https://github.com/puppeteer/puppeteer/issues/4039
      this.browser = await puppeteer.launch({
        pipe: true,
        args: chromeArgs,
      })
    } else {
      this.browser = await puppeteer.launch({
        args: chromeArgs,
      })
    }
  }

  async onModuleDestroy() {
    this.logger.log('Closing browser on module destroy...')
    this.browser && (await this.browser.close())
  }

  async generatePDFBuffer({
    htmlPageContent,
    paperFormat,
    orientation,
  }: GeneratePDFOptions) {
    const page = await this.browser.newPage()
    page.setCacheEnabled(false) // prevent old image cache
    await page.setContent(htmlPageContent, { waitUntil: 'networkidle0' })

    const buffer = await page.pdf({
      format: paperFormat,
      landscape: orientation === Orientation.Landscape,
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
  }
}
