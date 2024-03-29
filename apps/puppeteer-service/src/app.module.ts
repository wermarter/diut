import { ConfigModule, LogModule } from '@diut/nest-core'
import { Module } from '@nestjs/common'

import { AppConfig, LogConfig, loadAppConfig, loadLogConfig } from './configs'
import { PuppeteerModule } from './modules/puppeteer/puppeteer.module'

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
    PuppeteerModule,
  ],
})
export class AppModule {}
