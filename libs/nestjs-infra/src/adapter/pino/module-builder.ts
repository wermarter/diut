import { ConfigurableModuleBuilder } from '@nestjs/common'

import { PinoModuleOptions } from './utils'

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<PinoModuleOptions>().build()

export const INSTANCE_ID_TOKEN = 'INSTANCE_ID_TOKEN'
