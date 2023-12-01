import { ConfigModule, LogModule } from '@diut/nest-core'
import { Module } from '@nestjs/common'

import { AppConfig, LogConfig, loadAppConfig, loadLogConfig } from './configs'
import { HelloModule } from './modules/hello/hello.module'

@Module({
  imports: [
    ConfigModule.forRoot({}),
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
    HelloModule,
  ],
})
export class AppModule {}
