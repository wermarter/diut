import { concatModuleMetadata } from '@diut/nestjs-infra'
import { Module } from '@nestjs/common'

import { infraMetadata } from './infra'
import { useCaseMetadata } from './domain'
import { presentationMetadata } from './presentation'
import { configMetadata } from './config'

@Module(
  concatModuleMetadata([
    configMetadata,
    infraMetadata,
    useCaseMetadata,
    presentationMetadata,
  ]),
)
export class AppModule {}
