import { concatModuleMetadata } from '@diut/nest-core'
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
