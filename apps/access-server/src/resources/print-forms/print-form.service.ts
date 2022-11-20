import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { BaseMongoService } from 'src/clients/mongo'
import { PrintForm } from './print-form.schema'

@Injectable()
export class PrintFormService extends BaseMongoService<PrintForm> {
  constructor(@InjectModel(PrintForm.name) model: Model<PrintForm>) {
    super(model, new Logger(PrintFormService.name))
  }
}
