import { ConfigurableModuleBuilder } from '@nestjs/common'

import { AmqpClientOptions } from './service'

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<AmqpClientOptions>().build()

export function getServiceToken(instanceId?: string) {
  return `AmqpService:${instanceId ?? DEFAULT_INSTANCE_ID}`
}

export const INSTANCE_ID_TOKEN = 'AMQP_INSTANCE_ID'
export const DEFAULT_INSTANCE_ID = 'default'
