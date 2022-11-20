import { Module } from '@nestjs/common'

import { importCollection } from 'src/clients/mongo'
import { PrintFormController } from './print-form.controller'
import { PrintForm } from './print-form.schema'
import { PrintFormService } from './print-form.service'

@Module({
  imports: [importCollection(PrintForm)],
  providers: [PrintFormService],
  controllers: [PrintFormController],
  exports: [PrintFormService],
})
export class PrintFormModule {}
