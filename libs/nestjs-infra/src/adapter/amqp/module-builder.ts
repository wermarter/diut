import { ConfigurableModuleBuilder } from '@nestjs/common'

import { AmqpClientOptions } from './service'

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<AmqpClientOptions>().build()

export function getServiceToken(connectionId?: string) {
  return `AmqpService:${connectionId ?? DEFAULT_CONNECTION_ID}`
}

export const CONNECTION_ID_TOKEN = 'AMQP_CONNECTION_ID'
export const DEFAULT_CONNECTION_ID = 'default'
