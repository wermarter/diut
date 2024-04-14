import { Module } from '@nestjs/common'
import { concatModuleMetadata } from '@diut/nestjs-infra'

import { configMetadata } from './config'
import { infraMetadata } from './infra'
import { appMetadata } from './app'
import { presentationMetadata } from './presentation'

@Module(
  concatModuleMetadata([
    configMetadata,
    infraMetadata,
    appMetadata,
    presentationMetadata,
  ]),
)
export class AppModule {}
