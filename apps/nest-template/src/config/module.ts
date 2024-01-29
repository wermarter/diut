import { ConfigModule } from '@diut/nestjs-core'
import { ModuleMetadata } from '@nestjs/common'

import { loadAppConfig } from './app.config'
import { loadLogConfig } from './log.config'

export const configModulemetadata: ModuleMetadata = {
  imports: [
    ConfigModule.forRoot({}),
    ConfigModule.forFeature(loadAppConfig),
    ConfigModule.forFeature(loadLogConfig),
  ],
}
