import { Module } from '@nestjs/common'
import { MongoModule } from '@diut/server-core'

import { SampleOriginController } from './sample-origin.controller'
import { SampleOrigin } from './sample-origin.schema'
import { SampleOriginService } from './sample-origin.service'

@Module({
  imports: [MongoModule.forFeature(SampleOrigin)],
  providers: [SampleOriginService],
  controllers: [SampleOriginController],
  exports: [SampleOriginService],
})
export class SampleOriginModule {}
