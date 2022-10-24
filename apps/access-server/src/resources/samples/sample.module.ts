import { Module } from '@nestjs/common'

import { importCollection } from 'src/clients/mongo'
import { SampleController } from './sample.controller'
import { Sample } from './sample.schema'
import { SampleService } from './sample.service'

@Module({
  imports: [importCollection(Sample)],
  providers: [SampleService],
  controllers: [SampleController],
  exports: [SampleService],
})
export class SampleModule {}
