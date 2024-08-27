import { LogModule, concatModuleMetadata } from '@diut/nestjs-infra'

import { AppConfig, LogConfig, loadAppConfig, loadLogConfig } from 'src/config'

export const winstonMetadata = concatModuleMetadata([
  {
    imports: [
      LogModule.forRootAsync({
        inject: [loadAppConfig.KEY, loadLogConfig.KEY],
        useFactory: async (appConfig: AppConfig, logConfig: LogConfig) => ({
          serviceName: appConfig.SERVICE_NAME,
          lokiUrl: logConfig.LOKI_URL,
        }),
      }),
    ],
  },
])