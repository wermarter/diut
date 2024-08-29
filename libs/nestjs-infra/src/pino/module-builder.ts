import { ConfigurableModuleBuilder } from '@nestjs/common'

import { PinoModuleOptions } from './common'

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<PinoModuleOptions>().build()

export const INSTANCE_ID_TOKEN = Symbol('INSTANCE_ID_TOKEN')
