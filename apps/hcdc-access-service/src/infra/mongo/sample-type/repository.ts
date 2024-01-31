import { InjectModel } from '@nestjs/mongoose'
import { MongoRepository } from '@diut/nestjs-infra'
import { Model } from 'mongoose'

import { ISampleTypeRepository } from 'src/domain'
import { SampleTypeSchema } from './schema'

export class SampleTypeRepository
  extends MongoRepository<SampleTypeSchema>
  implements ISampleTypeRepository
{
  constructor(
    @InjectModel(SampleTypeSchema.name) model: Model<SampleTypeSchema>,
  ) {
    super(model)
  }
}
