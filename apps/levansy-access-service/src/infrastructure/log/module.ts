import { ConfigModule, LogModule, concatModuleMetadata } from '@diut/nest-core'

import { AppConfig, LogConfig, loadAppConfig, loadLogConfig } from '../config'

export const logMetadata = concatModuleMetadata([
  {
    imports: [
      LogModule.forRootAsync({
        imports: [
          ConfigModule.forFeature(loadAppConfig),
          ConfigModule.forFeature(loadLogConfig),
        ],
        inject: [loadAppConfig.KEY, loadLogConfig.KEY],
        useFactory: async (appConfig: AppConfig, logConfig: LogConfig) => ({
          serviceName: appConfig.SERVICE_NAME,
          lokiUrl: logConfig.LOKI_URL,
        }),
      }),
    ],
  },
])
