import { ConfigurableModuleBuilder } from '@nestjs/common'

import { PuppeteerClientOptions } from './service'

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<PuppeteerClientOptions>().build()

export function getServiceToken(connectionId?: string) {
  return `PuppeteerService:${connectionId ?? DEFAULT_CONNECTION_ID}`
}

export const CONNECTION_ID_TOKEN = 'PUPPETEER_CONNECTION_ID'
export const DEFAULT_CONNECTION_ID = 'default'
