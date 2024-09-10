import { ConfigurableModuleBuilder } from '@nestjs/common'

import { PuppeteerClientOptions } from './service'

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<PuppeteerClientOptions>().build()

export function getServiceToken(instanceId?: string) {
  return `PuppeteerService:${instanceId ?? DEFAULT_INSTANCE_ID}`
}

export const INSTANCE_ID_TOKEN = 'PUPPETEER_INSTANCE_ID'
export const DEFAULT_INSTANCE_ID = 'default'
