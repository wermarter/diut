import { concatModuleMetadata } from '@diut/nestjs-infra'
import { Module } from '@nestjs/common'

import { infrastructureMetadata } from './infrastructure/module'
import { ExampleModule } from './example/module'

@Module(
  concatModuleMetadata([
    infrastructureMetadata,
    {
      imports: [ExampleModule],
    },
  ]),
)
export class AppModule {}
