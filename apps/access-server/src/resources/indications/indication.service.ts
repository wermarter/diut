import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { BaseMongoService } from 'src/clients/mongo'
import { Indication } from './indication.schema'

@Injectable()
export class IndicationService extends BaseMongoService<Indication> {
  constructor(@InjectModel(Indication.name) model: Model<Indication>) {
    super(model, new Logger(IndicationService.name))
  }
}
