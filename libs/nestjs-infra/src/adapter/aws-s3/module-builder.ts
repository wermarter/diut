import { ConfigurableModuleBuilder } from '@nestjs/common'

import { AwsS3ClientOptions } from './service'

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<AwsS3ClientOptions>().build()

export function getServiceToken(instanceId?: string) {
  return `AwsS3Service:${instanceId ?? DEFAULT_INSTANCE_ID}`
}

export const INSTANCE_ID_TOKEN = 'AWS_S3_INSTANCE_ID'
export const DEFAULT_INSTANCE_ID = 'default'
