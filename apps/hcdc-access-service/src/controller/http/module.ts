import { RouterModule } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { concatModuleMetadata } from '@diut/nestjs-infra'

import { HealthCheckModule } from './health-check'
import { HttpV1Module } from './v1'
import { HttpExternalModule } from './external'
import { configMetadata } from 'src/config'
import { infraMetadata } from 'src/infra'

@Module(
  concatModuleMetadata([
    configMetadata,
    infraMetadata,
    {
      imports: [
        RouterModule.register([
          {
            path: 'health-check',
            module: HealthCheckModule,
          },
          {
            path: 'v1',
            module: HttpV1Module,
          },
          {
            path: 'external',
            module: HttpExternalModule,
          },
        ]),
      ],
    },
  ]),
)
export class HttpModule {}
