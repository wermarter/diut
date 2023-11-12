import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { MongoRepository } from '@diut/server-core'
import { Indication } from './indication.schema'

@Injectable()
export class IndicationService extends MongoRepository<Indication> {
  constructor(@InjectModel(Indication.name) model: Model<Indication>) {
    super(model)
  }
}
