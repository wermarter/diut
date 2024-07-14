import { ConfigurableModuleBuilder } from '@nestjs/common'

import { AxiosClientOptions } from './service'

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<AxiosClientOptions>().build()

export function getClientServiceToken(connectionId?: string) {
  return `AxiosClientService:${connectionId ?? DEFAULT_CONNECTION_ID}`
}

export const CONNECTION_ID_TOKEN = 'AXIOS_CONNECTION_ID'
export const DEFAULT_CONNECTION_ID = 'default'
