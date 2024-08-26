import { LogModule, concatModuleMetadata } from '@diut/nestjs-infra'

import { AppConfig, LogConfig, loadAppConfig, loadLogConfig } from 'src/config'

export const logMetadata = concatModuleMetadata([
  {
    imports: [
      LogModule.forRootAsync({
        inject: [loadAppConfig.KEY, loadLogConfig.KEY],
        useFactory: async (appConfig: AppConfig, logConfig: LogConfig) => {
          console.log({ appConfig, logConfig })
          return {
            serviceName: appConfig.SERVICE_NAME,
            lokiUrl: logConfig.LOKI_URL,
          }
        },
      }),
    ],
  },
])
