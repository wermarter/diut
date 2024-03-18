import { NodeEnv } from '@diut/common'
import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common'
import * as puppeteer from 'puppeteer-core'

import {
  AppConfig,
  PuppeteerConfig,
  loadAppConfig,
  loadPuppeteerConfig,
} from 'src/config'
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
    @Inject(loadPuppeteerConfig.KEY)
    private readonly puppeteerConfig: PuppeteerConfig,
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
    const options: puppeteer.PuppeteerLaunchOptions = {
      executablePath: this.puppeteerConfig.CHROMIUM_PATH,
      args: chromeArgs,
    }

    if (this.appConfig.NODE_ENV === NodeEnv.Development) {
      // https://github.com/puppeteer/puppeteer/issues/4039
      options.pipe = true
    }

    this.browser = await puppeteer.launch(options)
    this.logger.log('Browser connected!')
  }

  getBrowser() {
    if (this.browser === undefined) {
      throw new EPuppeteerInitFailed()
    }

    return this.browser
  }
}
