import { NodeEnv } from '@diut/common'
import { Inject, Injectable } from '@nestjs/common'
import * as puppeteer from 'puppeteer-core'
import { AbstractClientService } from '@diut/nestjs-infra'

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
  extends AbstractClientService
  implements IPuppeteerService
{
  private browser: puppeteer.Browser

  constructor(
    @Inject(loadAppConfig.KEY) private readonly appConfig: AppConfig,
    @Inject(loadPuppeteerConfig.KEY)
    private readonly puppeteerConfig: PuppeteerConfig,
  ) {
    super({ name: PuppeteerService.name, connectionId: 'Chromium' })
  }

  readyCheck() {
    if (!this.browser.connected) {
      throw new EPuppeteerInitFailed()
    }
  }

  async connect() {
    const options: puppeteer.PuppeteerLaunchOptions = {
      executablePath: this.puppeteerConfig.CHROMIUM_PATH,
      args: chromeArgs,
    }

    if (this.appConfig.NODE_ENV === NodeEnv.Development) {
      // https://github.com/puppeteer/puppeteer/issues/4039
      options.pipe = true
    }

    this.browser = await puppeteer.launch(options)
    this.readyCheck()
  }

  async close() {
    if (this.browser) {
      await this.browser.close()
    }
  }

  getBrowser() {
    if (this.browser === undefined) {
      throw new EPuppeteerInitFailed()
    }

    return this.browser
  }
}
