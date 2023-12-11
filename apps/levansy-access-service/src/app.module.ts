import { concatModuleMetadata } from '@diut/nest-core'
import { Module } from '@nestjs/common'

import { infrastructureMetadata } from './infrastructure'
import { useCaseMetadata } from './domain'
import { presentationMetadata } from './presentation'

@Module(
  concatModuleMetadata([
    presentationMetadata,
    useCaseMetadata,
    infrastructureMetadata,
  ]),
)
export class AppModule {}
