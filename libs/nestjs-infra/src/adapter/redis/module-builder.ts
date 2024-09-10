import { ConfigurableModuleBuilder } from '@nestjs/common'

import { RedisClientOptions } from './service'

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<RedisClientOptions>().build()

export function getServiceToken(instanceId?: string) {
  return `RedisService:${instanceId ?? DEFAULT_INSTANCE_ID}`
}

export const INSTANCE_ID_TOKEN = 'REDIS_INSTANCE_ID'
export const DEFAULT_INSTANCE_ID = 'default'
