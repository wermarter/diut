import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { MongoRepository } from '@diut/nest-core'

import { SampleOrigin } from './sample-origin.schema'

@Injectable()
export class SampleOriginService extends MongoRepository<SampleOrigin> {
  constructor(@InjectModel(SampleOrigin.name) model: Model<SampleOrigin>) {
    super(model)
  }
}
