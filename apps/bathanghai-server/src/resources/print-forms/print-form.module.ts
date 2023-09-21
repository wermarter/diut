import { Module } from '@nestjs/common'

import { MongoModule } from '@diut/server-core'
import { PrintFormController } from './print-form.controller'
import { PrintForm } from './print-form.schema'
import { PrintFormService } from './print-form.service'

@Module({
  imports: [MongoModule.forFeature([PrintForm])],
  providers: [PrintFormService],
  controllers: [PrintFormController],
  exports: [PrintFormService],
})
export class PrintFormModule {}
