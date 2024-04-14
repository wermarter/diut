import * as puppeteer from 'puppeteer-core'

export const PuppeteerServiceToken = Symbol('PuppeteerServiceToken')

export interface IPuppeteerService {
  getBrowser: () => puppeteer.Browser
}
