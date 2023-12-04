import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import * as puppeteer from 'puppeteer'

@Injectable()
export class BrowserService implements OnModuleInit {
  private browser: puppeteer.Browser
  private logger = new Logger(BrowserService.name)

  async onModuleInit() {
    const args = [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--single-process',
      // ' --no-zygote',
      '--disable-gpu',
      '--aggressive-cache-discard',
      '--disable-cache',
      '--disable-application-cache',
      '--disable-offline-load-stale-cache',
      '--disable-gpu-shader-disk-cache',
      '--media-cache-size=0',
      '--disk-cache-size=0',
      '--disable-extensions',
      '--disable-component-extensions-with-background-pages',
      '--disable-default-apps',
      '--mute-audio',
      '--no-default-browser-check',
      '--autoplay-policy=user-gesture-required',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-notifications',
      '--disable-background-networking',
      '--disable-breakpad',
      '--disable-component-update',
      '--disable-domain-reliability',
      '--disable-sync',
      '--disable-dev-profile',
    ]

    if (this.appConfig.NODE_ENV === NodeEnv.Development) {
      // https://github.com/puppeteer/puppeteer/issues/4039
      this.browser = await puppeteer.launch({
        headless: true,
        pipe: true,
        args,
      })
    } else {
      this.browser = await puppeteer.launch({
        headless: true,
        args,
      })
    }
  }
}
