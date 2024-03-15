import { NodeEnv } from '@diut/common'
import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common'
import * as puppeteer from 'puppeteer'

import { AppConfig, loadAppConfig } from 'src/config'
import { chromeArgs } from './common'
import { EPuppeteerInitFailed, IPuppeteerService } from 'src/domain'

@Injectable()
export class PuppeteerService
  implements OnModuleInit, OnModuleDestroy, IPuppeteerService
{
  private logger = new Logger(PuppeteerService.name)
  private browser: puppeteer.Browser

  constructor(
    @Inject(loadAppConfig.KEY) private readonly appConfig: AppConfig,
  ) {}

  async onModuleInit() {
    // TODO: implement retry and throw error
    await this.init()
  }

  async onModuleDestroy() {
    this.logger.log('Closing browser on module destroy...')
    this.browser && (await this.browser.close())
  }

  private async init() {
    if (this.appConfig.NODE_ENV === NodeEnv.Development) {
      // https://github.com/puppeteer/puppeteer/issues/4039
      this.browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        pipe: true,
        args: chromeArgs,
      })
    } else {
      this.browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        args: chromeArgs,
      })
    }
    this.logger.log('Browser connected!')
  }

  getBrowser() {
    if (this.browser === undefined) {
      throw new EPuppeteerInitFailed()
    }

    return this.browser
  }
}
