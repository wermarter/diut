import {
  BROWSER_SERVICE_NAME,
  DIUT_PACKAGE_NAME,
  DiutGrpcService,
  resolveProtoPath,
} from '@diut/services'
import { ModuleMetadata } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { ClientConfig, loadClientConfig } from 'src/config'
import { BROWSER_SERVICE_TOKEN } from 'src/domain'
import { BrowserService } from './service'

export const browserServiceMetadata: ModuleMetadata = {
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          name: BROWSER_SERVICE_NAME,
          inject: [loadClientConfig.KEY],
          useFactory: async (clientConfig: ClientConfig) => {
            return {
              transport: Transport.GRPC,
              options: {
                package: DIUT_PACKAGE_NAME,
                protoPath: resolveProtoPath(DiutGrpcService.Browser, __dirname),
                url: clientConfig.BROWSER_SERVICE_URL,
                gracefulShutdown: true,
                maxReceiveMessageLength: 20_000_000,
              },
            }
          },
        },
      ],
    }),
  ],
  providers: [
    {
      provide: BROWSER_SERVICE_TOKEN,
      useClass: BrowserService,
    },
  ],
}
