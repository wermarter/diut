import { ConfigurableModuleBuilder } from '@nestjs/common'
import { RedisModuleOptions } from './service'

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<RedisModuleOptions>().build()

export const INSTANCE_ID_TOKEN = 'REDIS_INSTANCE_ID'
export const DEFAULT_INSTANCE_ID = 'default'
