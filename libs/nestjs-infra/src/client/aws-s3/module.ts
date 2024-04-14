import { Module } from '@nestjs/common'

import { ConfigurableModuleClass } from './module-builder'
import { AwsS3ClientService } from './service'

@Module({
  providers: [AwsS3ClientService],
  exports: [AwsS3ClientService],
})
export class AwsS3ClientModule extends ConfigurableModuleClass {}
