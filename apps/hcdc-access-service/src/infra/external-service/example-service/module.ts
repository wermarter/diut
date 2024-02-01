import { ConfigModule } from '@diut/nestjs-infra'
import {
  DIUT_PACKAGE_NAME,
  DiutGrpcService,
  EXAMPLE_SERVICE_NAME,
  ExampleServiceClient,
  resolveProtoPath,
} from '@diut/services'
import { ModuleMetadata } from '@nestjs/common'
import { ClientsModule, Transport, ClientGrpc } from '@nestjs/microservices'

import { ClientConfig, loadClientConfig } from 'src/config'
import { ExampleServiceToken, IExampleService } from 'src/domain'

export const exampleServiceMetadata: ModuleMetadata = {
  imports: [
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: EXAMPLE_SERVICE_NAME,
          imports: [ConfigModule.forFeature(loadClientConfig)],
          inject: [loadClientConfig.KEY],
          useFactory: async (clientConfig: ClientConfig) => {
            return {
              transport: Transport.GRPC,
              options: {
                package: DIUT_PACKAGE_NAME,
                protoPath: resolveProtoPath(DiutGrpcService.Example, __dirname),
                url: clientConfig.EXAMPLE_SERVICE_URL,
              },
            }
          },
        },
      ],
    }),
  ],
  providers: [
    {
      provide: ExampleServiceToken,
      inject: [EXAMPLE_SERVICE_NAME],
      useFactory(client: ClientGrpc): IExampleService {
        return client.getService<ExampleServiceClient>(EXAMPLE_SERVICE_NAME)
      },
    },
  ],
}
