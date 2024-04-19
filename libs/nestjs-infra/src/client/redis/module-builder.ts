import { ConfigurableModuleBuilder } from '@nestjs/common'

import { RedisClientOptions } from './service'

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<RedisClientOptions>().build()
