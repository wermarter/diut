import * as puppeteer from 'puppeteer-core'

export const PUPPETEER_SERVICE_TOKEN = Symbol('PUPPETEER_SERVICE_TOKEN')

export interface IPuppeteerService {
  getBrowser: () => puppeteer.Browser
}
