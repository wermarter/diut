import { Module } from '@nestjs/common'

import { MongoModule } from '@diut/server-core'
import { SampleTypeController } from './sample-type.controller'
import { SampleType } from './sample-type.schema'
import { SampleTypeService } from './sample-type.service'

@Module({
  imports: [MongoModule.forFeature([SampleType])],
  providers: [SampleTypeService],
  controllers: [SampleTypeController],
  exports: [SampleTypeService],
})
export class SampleTypeModule {}
