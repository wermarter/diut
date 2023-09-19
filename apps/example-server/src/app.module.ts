import { ConfigModule, LogModule } from '@diut/server-core'
import { Module } from '@nestjs/common'

import { ServiceConfig, loadServiceConfig } from './configs/service.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loadServiceConfig],
    }),
    LogModule.forRootAsync({
      inject: [loadServiceConfig.KEY],
      useFactory: async (serviceConfig: ServiceConfig) => ({
        serviceName: serviceConfig.SERVICE_NAME,
        lokiUrl: '',
      }),
    }),
  ],
})
export class AppModule {}
