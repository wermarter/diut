import { RouterModule } from '@nestjs/core'
import { Module } from '@nestjs/common'

import { HealthCheckModule } from './health-check'
import { HttpV1Module } from './v1'
import { HttpExternalModule } from './external'

@Module({
  imports: [
    HealthCheckModule,
    HttpV1Module,
    HttpExternalModule,
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
})
export class HttpModule {}