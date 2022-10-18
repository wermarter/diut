import { Module } from '@nestjs/common'

import { importCollection } from 'src/clients/mongo'
import { SampleTypeController } from './sample-type.controller'
import { SampleType } from './sample-type.schema'
import { SampleTypeService } from './sample-type.service'

@Module({
  imports: [importCollection(SampleType)],
  providers: [SampleTypeService],
  controllers: [SampleTypeController],
  exports: [SampleTypeService],
})
export class SampleTypeModule {}
