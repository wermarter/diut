import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { MongoRepository } from '@diut/server-core'
import { SampleType } from './sample-type.schema'

@Injectable()
export class SampleTypeService extends MongoRepository<SampleType> {
  constructor(@InjectModel(SampleType.name) model: Model<SampleType>) {
    super(model)
  }
}
