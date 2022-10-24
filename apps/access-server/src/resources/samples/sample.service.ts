import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { BaseMongoService } from 'src/clients/mongo'
import { Sample } from './sample.schema'

@Injectable()
export class SampleService extends BaseMongoService<Sample> {
  constructor(@InjectModel(Sample.name) model: Model<Sample>) {
    super(model, new Logger(SampleService.name))
  }
}
