import { Module } from '@nestjs/common'

import { MongoModule } from '@diut/nest-core'
import { IndicationController } from './indication.controller'
import { Indication } from './indication.schema'
import { IndicationService } from './indication.service'

@Module({
  imports: [MongoModule.forFeature(Indication)],
  providers: [IndicationService],
  controllers: [IndicationController],
  exports: [IndicationService],
})
export class IndicationModule {}
