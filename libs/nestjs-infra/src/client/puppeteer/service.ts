import { Inject, Injectable } from '@nestjs/common'
import * as puppeteer from 'puppeteer-core'
import PuppeteerExtra from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

import { AbstractClientService } from '../abstract-service'
import { chromeArgs } from './common'
import {
  CONNECTION_ID_TOKEN,
  DEFAULT_CONNECTION_ID,
  MODULE_OPTIONS_TOKEN,
} from './module-builder'

export type PuppeteerClientOptions = puppeteer.PuppeteerLaunchOptions & {
  stealth?: boolean
}

@Injectable()
export class PuppeteerClientService extends AbstractClientService {
  public browser: puppeteer.Browser

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly clientOptions: PuppeteerClientOptions,
    @Inject(CONNECTION_ID_TOKEN)
    connectionId: string,
  ) {
    connectionId = connectionId ?? DEFAULT_CONNECTION_ID

    super({ connectionId })
  }

  readyCheck() {
    if (!this.browser.connected) {
      throw new Error('browser not connected')
    }
  }

  async connect() {
    const launchOptions: puppeteer.PuppeteerLaunchOptions = {
      args: chromeArgs,
      handleSIGINT: false,
      handleSIGHUP: false,
      handleSIGTERM: false,
      ...this.clientOptions,
    }

    if (this.clientOptions.stealth) {
      PuppeteerExtra.use(StealthPlugin())
      this.browser = await PuppeteerExtra.launch(launchOptions)
    } else {
      this.browser = await puppeteer.launch(launchOptions)
    }

    this.readyCheck()
  }

  async close() {
    if (this.browser) {
      await this.browser.close()
    }
  }
}
