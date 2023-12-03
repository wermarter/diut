import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { MongoRepository } from '@diut/nest-core'

import { PrintForm } from './print-form.schema'

@Injectable()
export class PrintFormService extends MongoRepository<PrintForm> {
  constructor(@InjectModel(PrintForm.name) model: Model<PrintForm>) {
    super(model)
  }
}
