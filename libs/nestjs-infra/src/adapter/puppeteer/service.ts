import { Inject, Injectable } from '@nestjs/common'
import * as puppeteer from 'puppeteer-core'
import PuppeteerExtra from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

import { AbstractService } from '../abstract.service'
import { chromeArgs } from './common'
import {
  DEFAULT_INSTANCE_ID,
  INSTANCE_ID_TOKEN,
  MODULE_OPTIONS_TOKEN,
} from './module-builder'

export type PuppeteerClientOptions = puppeteer.PuppeteerLaunchOptions & {
  stealth?: boolean
}

@Injectable()
export class PuppeteerService extends AbstractService {
  public browser: puppeteer.Browser

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly clientOptions: PuppeteerClientOptions,
    @Inject(INSTANCE_ID_TOKEN)
    instanceId: string,
  ) {
    instanceId = instanceId ?? DEFAULT_INSTANCE_ID

    super({ instanceId })
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
  }

  async close() {
    if (this.browser) {
      await this.browser.close()
    }
  }
}
