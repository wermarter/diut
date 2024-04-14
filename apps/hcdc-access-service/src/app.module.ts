import { concatModuleMetadata } from '@diut/nestjs-infra'
import { Module } from '@nestjs/common'

import { infraMetadata } from './infra'
import { appMetadata } from './app'
import { presentationMetadata } from './presentation'
import { configMetadata } from './config'

@Module(
  concatModuleMetadata([
    configMetadata,
    infraMetadata,
    appMetadata,
    presentationMetadata,
  ]),
)
export class AppModule {}
