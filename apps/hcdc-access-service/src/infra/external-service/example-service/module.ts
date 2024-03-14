import { ConfigModule } from '@diut/nestjs-infra'
import {
  DIUT_PACKAGE_NAME,
  DiutGrpcService,
  BROWSER_SERVICE_NAME,
  BrowserServiceClient,
  resolveProtoPath,
} from '@diut/services'
import { ModuleMetadata } from '@nestjs/common'
import { ClientsModule, Transport, ClientGrpc } from '@nestjs/microservices'

import { ClientConfig, loadClientConfig } from 'src/config'
import { BrowserServiceToken } from 'src/domain'

export const browserServiceMetadata: ModuleMetadata = {
  imports: [
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: BROWSER_SERVICE_NAME,
          imports: [ConfigModule.forFeature(loadClientConfig)],
          inject: [loadClientConfig.KEY],
          useFactory: async (clientConfig: ClientConfig) => {
            return {
              transport: Transport.GRPC,
              options: {
                package: DIUT_PACKAGE_NAME,
                protoPath: resolveProtoPath(DiutGrpcService.Browser, __dirname),
                url: clientConfig.BROWSER_SERVICE_URL,
              },
            }
          },
        },
      ],
    }),
  ],
  providers: [
    {
      provide: BrowserServiceToken,
      inject: [BROWSER_SERVICE_NAME],
      useFactory(client: ClientGrpc) {
        return client.getService<BrowserServiceClient>(BROWSER_SERVICE_NAME)
      },
    },
  ],
}
