import { ConfigurableModuleBuilder } from '@nestjs/common'

import { TypeormModuleOptions } from './common'

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<TypeormModuleOptions>().build()
