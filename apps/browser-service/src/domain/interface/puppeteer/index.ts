import * as puppeteer from 'puppeteer'

export const PuppeteerServiceToken = Symbol('PuppeteerServiceToken')

export interface IPuppeteerService {
  getBrowser: () => puppeteer.Browser
}
