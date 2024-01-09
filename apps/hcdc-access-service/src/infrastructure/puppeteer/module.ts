import {
  ConfigModule,
  DIUT_PACKAGE_NAME,
  PUPPETEER_SERVICE_NAME,
  ProtobufService,
  PuppeteerServiceClient,
  resolveProtoPath,
} from '@diut/nest-core'
import { ModuleMetadata } from '@nestjs/common'
import { ClientsModule, Transport, ClientGrpc } from '@nestjs/microservices'

import { ClientConfig, loadClientConfig } from 'src/config'
import { IPuppeteerService, PuppeteerServiceToken } from 'src/domain'

export const puppeteerMetadata: ModuleMetadata = {
  imports: [
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: PUPPETEER_SERVICE_NAME,
          imports: [ConfigModule.forFeature(loadClientConfig)],
          inject: [loadClientConfig.KEY],
          useFactory: async (clientConfig: ClientConfig) => {
            return {
              transport: Transport.GRPC,
              options: {
                package: DIUT_PACKAGE_NAME,
                protoPath: resolveProtoPath(
                  ProtobufService.Puppeteer,
                  __dirname,
                ),
                url: clientConfig.PUPPETEER_SERVICE_URL,
              },
            }
          },
        },
      ],
    }),
  ],
  providers: [
    {
      provide: PuppeteerServiceToken,
      inject: [PUPPETEER_SERVICE_NAME],
      useFactory(client: ClientGrpc): IPuppeteerService {
        return client.getService<PuppeteerServiceClient>(PUPPETEER_SERVICE_NAME)
      },
    },
  ],
}
