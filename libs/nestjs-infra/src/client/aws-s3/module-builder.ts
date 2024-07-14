import { ConfigurableModuleBuilder } from '@nestjs/common'

import { AwsS3ClientOptions } from './service'

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<AwsS3ClientOptions>().build()

export function getClientServiceToken(connectionId?: string) {
  return `AwsS3ClientService:${connectionId ?? DEFAULT_CONNECTION_ID}`
}

export const CONNECTION_ID_TOKEN = 'AWS_S3_CONNECTION_ID'
export const DEFAULT_CONNECTION_ID = 'default'
