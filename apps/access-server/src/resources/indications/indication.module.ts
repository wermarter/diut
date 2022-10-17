import { Module } from '@nestjs/common'

import { importCollection } from 'src/clients/mongo'
import { IndicationController } from './indication.controller'
import { Indication } from './indication.schema'
import { IndicationService } from './indication.service'

@Module({
  imports: [importCollection(Indication)],
  providers: [IndicationService],
  controllers: [IndicationController],
  exports: [IndicationService],
})
export class IndicationModule {}
