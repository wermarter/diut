import { ConfigurableModuleBuilder } from '@nestjs/common'

import { RedisClientOptions } from './service'

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<RedisClientOptions>().build()

export function getServiceToken(connectionId?: string) {
  return `RedisService:${connectionId ?? DEFAULT_CONNECTION_ID}`
}

export const CONNECTION_ID_TOKEN = 'REDIS_CONNECTION_ID'
export const DEFAULT_CONNECTION_ID = 'default'
