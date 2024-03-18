import { ConfigurableModuleBuilder } from '@nestjs/common'

import { AwsS3ClientOptions } from './service'

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<AwsS3ClientOptions>().build()
