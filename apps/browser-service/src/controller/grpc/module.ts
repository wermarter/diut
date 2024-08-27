import { Module } from '@nestjs/common'
import { concatModuleMetadata } from '@diut/nestjs-infra'

import { BrowserServiceController } from './controller'
import { commonModuleMetadata } from './shared'

@Module(
  concatModuleMetadata([
    ...commonModuleMetadata,
    {
      controllers: [BrowserServiceController],
    },
  ]),
)
export class GrpcModule {}
