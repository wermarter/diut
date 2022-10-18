import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { BaseMongoService } from 'src/clients/mongo'
import { SampleType } from './sample-type.schema'

@Injectable()
export class SampleTypeService extends BaseMongoService<SampleType> {
  constructor(@InjectModel(SampleType.name) model: Model<SampleType>) {
    super(model, new Logger(SampleTypeService.name))
  }
}
