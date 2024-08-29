import { PinoModule } from '@diut/nestjs-infra'
import { ModuleMetadata } from '@nestjs/common'

import { AppConfig, LogConfig, loadAppConfig, loadLogConfig } from 'src/config'

export const pinoMetadata: ModuleMetadata = {
  imports: [
    PinoModule.registerAsync({
      inject: [loadAppConfig.KEY, loadLogConfig.KEY],
      useFactory: async (appConfig: AppConfig, logConfig: LogConfig) => ({
        serviceName: appConfig.SERVICE_NAME,
        lokiUrl: logConfig.LOKI_URL,
      }),
    }),
  ],
}
