import { ConfigurableModuleBuilder } from '@nestjs/common'
import { PuppeteerModuleOptions } from './service'

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<PuppeteerModuleOptions>().build()

export const INSTANCE_ID_TOKEN = 'INSTANCE_ID_TOKEN'
export const DEFAULT_INSTANCE_ID = 'default'
