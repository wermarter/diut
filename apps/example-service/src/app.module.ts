import { Module } from '@nestjs/common'
import { concatModuleMetadata } from '@diut/nestjs-infra'

import { configMetadata } from './config'
import { infraMetadata } from './infra'

@Module(concatModuleMetadata([configMetadata, infraMetadata]))
export class AppModule {}
