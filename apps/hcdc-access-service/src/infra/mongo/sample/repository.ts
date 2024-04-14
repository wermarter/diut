import { InjectModel } from '@nestjs/mongoose'
import { MongoRepository } from '@diut/nestjs-infra'
import { Model } from 'mongoose'

import { ISampleRepository } from 'src/domain'
import { SampleSchema } from './schema'

export class SampleRepository
  extends MongoRepository<SampleSchema>
  implements ISampleRepository
{
  constructor(@InjectModel(SampleSchema.name) model: Model<SampleSchema>) {
    super(model)
  }
}
