import { ConfigurableModuleBuilder } from '@nestjs/common'

import { AwsS3ModuleOptions } from './service'

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<AwsS3ModuleOptions>().build()

export const INSTANCE_ID_TOKEN = 'INSTANCE_ID_TOKEN'
export const DEFAULT_INSTANCE_ID = 'default'
