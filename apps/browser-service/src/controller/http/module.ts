import { concatModuleMetadata } from '@diut/nestjs-infra'
import { Module } from '@nestjs/common'
import { healthModuleMetadata } from './health'
import { commonModuleMetadata } from './shared'

@Module(concatModuleMetadata([...commonModuleMetadata, healthModuleMetadata]))
export class HttpModule {}
