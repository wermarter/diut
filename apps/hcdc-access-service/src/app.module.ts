import { concatModuleMetadata } from '@diut/nest-core'
import { Module } from '@nestjs/common'

import { infrastructureMetadata } from './infrastructure'
import { useCaseMetadata } from './domain'
import { presentationMetadata } from './presentation'
import { configMetadata } from './config'

@Module(
  concatModuleMetadata([
    configMetadata,
    infrastructureMetadata,
    useCaseMetadata,
    presentationMetadata,
  ]),
)
export class AppModule {}
