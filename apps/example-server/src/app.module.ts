import { ConfigModule, LogModule } from '@diut/server-core'
import { Module } from '@nestjs/common'

import { ServiceConfig, loadServiceConfig } from './configs/service.config'

@Module({
  imports: [
    LogModule.forRootAsync({
      imports: [ConfigModule.forFeature(loadServiceConfig)],
      inject: [loadServiceConfig.KEY],
      useFactory: async (serviceConfig: ServiceConfig) => ({
        serviceName: serviceConfig.SERVICE_NAME,
      }),
    }),
  ],
})
export class AppModule {}
